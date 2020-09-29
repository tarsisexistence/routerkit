import {
  ArrayLiteralExpression,
  ArrowFunction,
  CallExpression,
  ClassDeclaration,
  Expression,
  Identifier,
  Node,
  ObjectLiteralExpression,
  Project,
  PropertyAccessExpression,
  SourceFile,
  Type,
  TypeChecker
} from 'ts-morph';
import { resolve, sep } from 'path';
import { evaluate } from '@wessberg/ts-evaluator';

import { getSourceFileOrThrow } from './get-source-file-from-paths';
export const getRouteModuleForRootExpressions: (
  routerModuleClass: ClassDeclaration
) => ArrayLiteralExpression | null = (routerModuleClass: ClassDeclaration): ArrayLiteralExpression | null => {
  const refs = routerModuleClass.findReferencesAsNodes();

  // todo add check for Router.RouterModule.for....
  const forRootExpressions = getRouterModuleCallExpressions(refs, 'forRoot');
  if (forRootExpressions.length > 1) {
    throw new Error('You have more than one RouterModule.forRoot expression');
  }

  const forRootExpression = forRootExpressions[0];
  return findRouterModuleArgumentValue(forRootExpression);
};

const findRouterModuleArgumentValue = (routerExpr: CallExpression): ArrayLiteralExpression | null => {
  const args = routerExpr.getArguments();
  if (args.length === 0) {
    const filePath = routerExpr.getSourceFile().getFilePath();
    throw new Error(`RouterModule in ${filePath} hasn't arguments`);
  }

  const firstArg = args[0];
  if (Node.isArrayLiteralExpression(firstArg)) {
    return firstArg;
  } else if (Node.isIdentifier(firstArg)) {
    return tryFindVariableValue(firstArg, Node.isArrayLiteralExpression);
  }
  // todo for spread forRoot(...array)
  return null;
};

const tryFindPropertyAccessExpressionValue = <T extends Node>(
  expression: PropertyAccessExpression,
  valueTypeChecker: (node: Node) => node is T
) => {
  const id = expression.getNameNode();
  return tryFindVariableValue(id, valueTypeChecker);
};

const tryFindVariableValue = <T extends Node>(
  id: Identifier,
  valueTypeChecker: (node: Node) => node is T
): T | null => {
  const defs = id.getDefinitionNodes();

  for (const def of defs) {
    // expression.expression1.varName
    if (Node.isInitializerExpressionGetableNode(def)) {
      const initializer = def.getInitializer();
      if (initializer && valueTypeChecker(initializer)) {
        return initializer;
      }
    }
  }

  return null;
};

export const getRouterModuleCallExpressions: (
  routeModules: Node[],
  expression: RouterKit.Parse.RouterExpression
) => CallExpression[] = (routeModules: Node[], expression: RouterKit.Parse.RouterExpression): CallExpression[] => {
  return routeModules
    .map(ref => ref.getParent() as PropertyAccessExpression)
    .filter(node => Node.isPropertyAccessExpression(node))
    .filter(node => {
      if (Node.hasName(node)) {
        return node.getName() === expression;
      }

      return false;
    })
    .map(node => node.getParent() as CallExpression)
    .filter(node => Node.isCallExpression(node));
};

export const parseRoutes = (
  routes: ArrayLiteralExpression,
  routerType: Type,
  parsedModules: Set<Type>,
  project: Project
): RouterKit.Parse.RouteTree => {
  let root: RouterKit.Parse.RouteTree = {};
  const elements = routes.getElements();

  for (const el of elements) {
    let parsedRoute: RouterKit.Parse.RouteTree | null = null;

    if (Node.isObjectLiteralExpression(el)) {
      parsedRoute = parseRoute(el, routerType, parsedModules, project);
    } else if (Node.isIdentifier(el)) {
      const value = tryFindVariableValue(el, Node.isObjectLiteralExpression);
      if (value) {
        parsedRoute = parseRoute(value, routerType, parsedModules, project);
      }
    }

    if (parsedRoute) {
      root = { ...root, ...parsedRoute };
    }
  }

  return root;
};

const parseRoute = (
  route: ObjectLiteralExpression,
  routerType: Type,
  parsedModules: Set<Type>,
  project: Project
): RouterKit.Parse.RouteTree | null => {
  const root: RouterKit.Parse.RouteTree = {};
  const typeChecker = project.getTypeChecker();
  const path = readPath(route, typeChecker);
  const routeName = path === '' ? 'root' : path;
  root[routeName] = {};

  const sourceFile = route.getSourceFile();
  const loadChildren = readLoadChildrenWithFullModulePath(route, sourceFile, typeChecker);

  if (loadChildren) {
    const lazyModule = getLazyModuleDeclaration(project, loadChildren);
    const lazyModuleRouteTree = createModuleRouteTree(project, lazyModule, parsedModules, routerType);
    root[routeName] = { ...lazyModuleRouteTree };
  } else {
    root[routeName] = readChildren(route, routerType, parsedModules, project);
  }

  return root;
};

const getLazyModuleDeclaration = (project: Project, loadChildren: RouterKit.Parse.LoadChildren): ClassDeclaration => {
  const { path, moduleName } = loadChildren;
  const pathWithExtension = path.endsWith('.ts') ? path : `${path}.ts`;
  const sourceFile = getSourceFileOrThrow(project, pathWithExtension);
  return sourceFile.getClassOrThrow(moduleName);
};

export const createProjectRouteTree = (
  project: Project,
  appModule: ClassDeclaration,
  forRootExpr: ArrayLiteralExpression,
  routerType: Type
): RouterKit.Parse.RouteTree => {
  let root: RouterKit.Parse.RouteTree = {};
  const parsedModules = new Set<Type>();
  const eagersTree = createModuleRouteTree(project, appModule, parsedModules, routerType);
  root = { ...root, ...eagersTree };

  const parsedRoot = parseRoutes(forRootExpr, routerType, parsedModules, project);
  return { ...root, ...parsedRoot };
};

const createModuleRouteTree = (
  project: Project,
  module: ClassDeclaration,
  parsedModules: Set<Type>,
  routerType: Type
): RouterKit.Parse.RouteTree => {
  let root: RouterKit.Parse.RouteTree = {};

  const eagerForChildExpr = findRouteChildren(routerType, module, parsedModules);
  for (const forChildExpr of eagerForChildExpr) {
    const routes = findRouterModuleArgumentValue(forChildExpr);
    if (routes) {
      const parsed = parseRoutes(routes, routerType, parsedModules, project);
      root = { ...root, ...parsed };
    }
  }

  return root;
};

/**
 * Get Module Declaration, parse imports, find route modules and parse them
 */
export const findRouteChildren = (
  routerType: Type,
  rootModule: ClassDeclaration,
  parsedModules: Set<Type>
): CallExpression[] => {
  const routerModules: CallExpression[] = [];
  const modules = [rootModule];

  while (modules.length) {
    const currentModule = modules.shift() as ClassDeclaration;

    if (currentModule !== rootModule && parsedModules.has(currentModule.getType())) {
      continue;
    }

    const imports = getImportsFromModuleDeclaration(currentModule);

    const { routerExpressions, moduleDeclarations } = divideRouterExpressionsAndModulesDeclarations(
      imports,
      routerType
    );

    if (!routerExpressions.length) {
      parsedModules.add(currentModule.getType());
    }

    routerModules.push(...routerExpressions);
    modules.push(...moduleDeclarations);
  }

  return routerModules;
};

// todo need refactoring
const divideRouterExpressionsAndModulesDeclarations = (
  modules: Node[],
  routerType: Type
): {
  routerExpressions: CallExpression[];
  moduleDeclarations: ClassDeclaration[];
} => {
  const routerExpressions: CallExpression[] = [];
  const moduleDeclarations: ClassDeclaration[] = [];
  const isRouterType = isClassHasTheSameType.bind(null, routerType);

  for (const node of modules) {
    const parsedNode = getModuleDeclarationOrCallExpressionById(node, isRouterType);
    if (parsedNode) {
      Node.isCallExpression(parsedNode) ? routerExpressions.push(parsedNode) : moduleDeclarations.push(parsedNode);
    }
  }

  return {
    routerExpressions,
    moduleDeclarations
  };
};

const getModuleDeclarationOrCallExpressionById = (
  node: Node,
  isRouter: (clazz: ClassDeclaration) => boolean
): ClassDeclaration | CallExpression | null => {
  if (Node.isIdentifier(node)) {
    const decl = findModuleDeclarationOrExpressionByIdentifier(node);

    if (decl) {
      if (Node.isClassDeclaration(decl)) {
        return decl;
      } else if (Node.isCallExpression(decl)) {
        return getModuleDeclarationOrRouterExpressionFromCall(decl, isRouter);
      }
    }
  } else if (Node.isCallExpression(node)) {
    return getModuleDeclarationOrRouterExpressionFromCall(node, isRouter);
  }

  return null;
};

const getModuleDeclarationOrRouterExpressionFromCall = (
  call: CallExpression,
  isRouter: (clazz: ClassDeclaration) => boolean
): CallExpression | ClassDeclaration | null => {
  const decl = getModuleDeclarationFromExpression(call);
  if (decl) {
    return isRouter(decl) ? call : decl;
  }

  return null;
};

const isClassHasTheSameType = (type: Type, clazz: ClassDeclaration): boolean => {
  const classType = clazz.getType();
  return classType === type;
};

/*
 * return class from Module.forRoot/Module.forChild expressions
 */
export const getModuleDeclarationFromExpression = (callExpr: CallExpression): ClassDeclaration | null => {
  const expr = callExpr.getExpression();
  if (Node.isPropertyAccessExpression(expr)) {
    const name = expr.getName();
    if (name === 'forRoot' || 'forChild') {
      const moduleName = expr.getExpression();
      if (Node.isIdentifier(moduleName)) {
        return findClassDeclarationByIdentifier(moduleName);
      } else if (Node.isPropertyAccessExpression(moduleName)) {
        return getClassIdentifierFromPropertyAccessExpression(moduleName);
      }
    }
  }

  console.error(`Can't find module name in expression: ${callExpr.getText()}`);
  return null;
};

const getClassIdentifierFromPropertyAccessExpression = (node: PropertyAccessExpression): ClassDeclaration | null => {
  const name = node.getNameNode();
  if (Node.isIdentifier(name)) {
    return findClassDeclarationByIdentifier(name);
  } else {
    throw new Error(`Can't parse PropertyAccessExpression ${node.getText()}`);
  }
};

const getImportsFromModuleDeclaration = (module: ClassDeclaration): Node[] => {
  const decorator = module.getDecorator('NgModule');
  if (!decorator) {
    return [];
  }

  const arg = decorator.getArguments()?.[0];
  if (!arg) {
    return [];
  }

  return parseImports(arg)?.getElements() || [];
};

const parseImports = (importsArg: Node): ArrayLiteralExpression | null => {
  if (Node.isObjectLiteralExpression(importsArg)) {
    const imports = getPropertyValue(importsArg, 'imports');
    if (!imports) {
      return null;
    }

    if (Node.isIdentifier(imports)) {
      return tryFindVariableValue(imports, Node.isArrayLiteralExpression);
    } else if (Node.isArrayLiteralExpression(imports)) {
      return imports;
    } // todo find other cases (imports: [...imports]
  }

  return null;
};

const readPath = (node: ObjectLiteralExpression, typeChecker: TypeChecker): string => {
  const expression = getPropertyValue(node, 'path');
  if (expression) {
    const path = evaluateExpression(expression, typeChecker);
    return typeof path === 'string' ? path : '/';
  }

  return '/';
};

const readChildren = (
  node: ObjectLiteralExpression,
  routerType: Type,
  parsedModules: Set<Type>,
  project: Project
): RouterKit.Parse.RouteTree => {
  let root: RouterKit.Parse.RouteTree = {};
  const expression = getPropertyValue(node, 'children');
  if (expression && Node.isArrayLiteralExpression(expression)) {
    const routes = parseRoutes(expression, routerType, parsedModules, project);
    root = { ...root, ...routes };
  } // todo case, where children is a variable

  return root;
};

export const readLoadChildrenWithFullModulePath = (
  node: ObjectLiteralExpression,
  currentSourceFile: SourceFile,
  typeChecker: TypeChecker
): RouterKit.Parse.LoadChildren | null => {
  const loadChildren = readLoadChildren(node, typeChecker);
  if (!loadChildren) {
    return null;
  }

  const { path } = loadChildren;
  if (!path.startsWith(`.${sep}`)) {
    return loadChildren;
  }

  const currentFilePath = currentSourceFile.getFilePath();
  const reducedPath = currentFilePath.split(sep);
  const currentDir = reducedPath.slice(0, reducedPath.length - 1).join(sep);
  const fullPathToLazyModule = resolve(currentDir, path);
  return { ...loadChildren, path: fullPathToLazyModule };
};

const readLoadChildren = (
  node: ObjectLiteralExpression,
  typeChecker: TypeChecker
): RouterKit.Parse.LoadChildren | null => {
  const expression = getPropertyValue(node, 'loadChildren');
  if (!expression) {
    return null;
  }
  if (Node.isStringLiteral(expression)) {
    return getOldLoadChildrenSyntaxPath(expression.getLiteralValue());
  }

  if (Node.isArrowFunction(expression)) {
    const body = expression.getBody();
    if (Node.isCallExpression(body)) {
      return parseLoadChildrenFunction(body);
    }
  }
  // loadChildren: 'foo' + '/' + 'bar'
  const path = evaluateExpression(node, typeChecker);
  return path ? getOldLoadChildrenSyntaxPath(path) : null;
};

const getOldLoadChildrenSyntaxPath = (str: string): RouterKit.Parse.LoadChildren | null => {
  const [path, module] = str.split('#');
  if (typeof path === 'string' && module) {
    return { path, moduleName: module };
  }

  return null;
};

const parseLoadChildrenFunction = (fnNode: CallExpression): RouterKit.Parse.LoadChildren | null => {
  const parsedLoadChildren: Partial<RouterKit.Parse.LoadChildren> = {};
  const accessExpression = fnNode.getExpression();
  if (Node.isPropertyAccessExpression(accessExpression)) {
    const impExpr = accessExpression.getExpression();
    if (Node.isCallExpression(impExpr)) {
      const impArg = impExpr.getArguments()?.[0];
      if (Node.isStringLiteral(impArg)) {
        parsedLoadChildren.path = impArg.getLiteralText();
      }
    }
  }

  const args = fnNode.getArguments()?.[0];
  if (args && Node.isArrowFunction(args)) {
    return parseLazyModuleArrowFn(args);
  }

  const { path, moduleName } = parsedLoadChildren;
  if (typeof path === 'string' && moduleName) {
    return { path, moduleName };
  }

  return null;
};

const parseLazyModuleArrowFn = (node: ArrowFunction): RouterKit.Parse.LoadChildren | null => {
  const body = node.getBody();
  if (Node.isPropertyAccessExpression(body)) {
    const module = body.getNameNode();
    const clazz = findClassDeclarationByIdentifier(module);
    if (clazz) {
      return {
        path: clazz.getSourceFile().getFilePath(),
        moduleName: module.getText()
      };
    }
  }

  return null;
};

const evaluateExpression = (node: Expression, morphTypeChecker: TypeChecker): string | null => {
  const compilerNode = node.compilerNode;
  const typeChecker = morphTypeChecker.compilerObject;
  const result = evaluate({
    node: compilerNode,
    typeChecker
  });

  return result.success ? (result.value as string) : null;
};

const getPropertyValue = (node: ObjectLiteralExpression, property: string): Expression | null => {
  const objectProperty = node.getProperty(property);
  if (objectProperty && Node.isPropertyAssignment(objectProperty)) {
    const initializer = objectProperty.getInitializer();
    if (initializer && Node.isIdentifier(initializer)) {
      return tryFindVariableValue(initializer, Node.isExpression);
    } else if (initializer && Node.isPropertyAccessExpression(initializer)) {
      return tryFindPropertyAccessExpressionValue(initializer, Node.isExpression);
    }

    return initializer || null;
  }

  return null;
};

export const getAppModule = (project: Project, path: string): ClassDeclaration => {
  const sourceFile = project.getSourceFileOrThrow(path);

  let bootstrapId: Identifier | undefined;

  function findBootstrapModule(node: Node): void {
    if (Node.isIdentifier(node) && node.getText() === 'bootstrapModule') {
      bootstrapId = node;
    } else {
      node.forEachChild(findBootstrapModule);
    }
  }
  sourceFile.forEachChild(findBootstrapModule);

  if (!bootstrapId) {
    throw new Error(`Can't find bootstrapModule expression in ${path}`);
  }

  const parent = bootstrapId?.getParentOrThrow();
  const callExpresion = parent.getParentOrThrow();
  if (Node.isCallExpression(callExpresion)) {
    const module = callExpresion.getArguments()?.[0];
    // todo when module is not class token
    const declaration = findClassDeclarationByIdentifier(module as Identifier);
    if (!declaration) {
      throw new Error(`Can't find AppModule!`);
    }

    return declaration;
  }

  throw new Error(`Can't find AppModule!`);
};

/*
 * return module declaration(class declarations) by id
 * example:
 * imports: [BrowserModule] => export class BrowserModule node
 * or return module expression
 * example:
 * imports [ module ] => const module = ModuleName.forRoot/ModuleName.forChild node
 */
const findModuleDeclarationOrExpressionByIdentifier = (id: Identifier): ClassDeclaration | CallExpression | null => {
  // todo decide what to do if there are more then one declaration
  const decl = id.getDefinitionNodes()?.[0];
  if (decl) {
    if (Node.isClassDeclaration(decl)) {
      return decl;
    } else if (Node.isVariableDeclaration(decl)) {
      return decl.getInitializer() as CallExpression;
    }
  }

  return null;
};

const findClassDeclarationByIdentifier = (id: Identifier): ClassDeclaration | null => {
  const decls = id.getDefinitionNodes();
  const classDeclarations = decls.filter(node => Node.isClassDeclaration(node));

  if (classDeclarations.length) {
    return classDeclarations[0] as ClassDeclaration;
  }

  return null;
};
