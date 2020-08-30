import { Tree } from '@angular-devkit/schematics';
import {
  WorkspaceProject,
  WorkspaceSchema
} from '@angular-devkit/core/src/experimental/workspace';
import { ClassDeclaration, Node, Project } from 'ts-morph';
import { resolve } from 'path';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');

  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  // TODO: why toString then parse
  const content = angularJson.toString();
  return JSON.parse(content);
};

export const getProjectTsconfigPath = (
  workspace: WorkspaceProject,
  projectName: string
): string => {
  const tsconfig: undefined | string | string[] =
    workspace.architect?.build?.options?.tsConfig;
  const tsconfigPath = Array.isArray(tsconfig)
    ? tsconfig.find(
        path => path.includes('tsconfig') && path.slice(-5) === '.json'
      )
    : tsconfig;

  if (typeof tsconfigPath !== 'string') {
    console.log(tsconfigPath);
    throw new Error(
      `Can't find tsconfig inside angular.json for ${projectName} project. An appropriate config name should include 'tsconfig' and '.json'`
    );
  }

  return resolve(process.cwd(), tsconfigPath);
};

export const getScaffoldingPath = (tsconfigPath: string): string =>
  resolve(tsconfigPath, '..');

export const getProjectAST = (tsConfigFilePath: string): Project =>
  new Project({ tsConfigFilePath, addFilesFromTsConfig: true });

export const getRouterModuleClass = (project: Project): ClassDeclaration => {
  const moduleImport = project
    .getSourceFiles()
    .map(file => file.getImportDeclaration('@angular/router'))
    .filter(imp => !!imp)?.[0];

  if (!moduleImport) {
    throw new Error("Can't find RouterModule");
  }

  const routerModuleSpec = moduleImport
    .getNamedImports()
    .filter(imp => imp.getName() === 'RouterModule')?.[0];
  if (routerModuleSpec) {
    const id = routerModuleSpec.getNameNode();
    const def = id.getDefinitionNodes()?.[0];

    if (Node.isClassDeclaration(def)) {
      return def;
    }
  }

  const routeDef = moduleImport.getModuleSpecifierSourceFileOrThrow();
  const routerModule = routeDef.getClass('RouterModule');

  if (!routerModule) {
    throw new Error(`Can't find RouterModule in ${routeDef.getFilePath()}`);
  }

  return routerModule;
};
