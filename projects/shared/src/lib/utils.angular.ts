import { Tree } from '@angular-devkit/schematics';
import { ClassDeclaration, Node, Project } from 'ts-morph';
import { resolve } from 'path';
import { error } from './common.utils';

// TODO: find where to import the original type from '@angular-devkit/core/src/experimental/workspace';
// import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
type WorkspaceProject = any;
type WorkspaceSchema = any;

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');

  if (!angularJson) {
    throw error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content);
};

export const getProjectTsconfigPath = (workspace: WorkspaceProject, projectName: string): string => {
  const tsconfig: undefined | string | string[] = workspace.architect?.build?.options?.tsConfig;
  const tsconfigPath = Array.isArray(tsconfig)
    ? tsconfig.find(path => path.includes('tsconfig') && path.slice(-5) === '.json')
    : tsconfig;

  if (typeof tsconfigPath !== 'string') {
    throw error(
      `Can't find tsconfig inside angular.json for ${projectName} project. An appropriate config name should include 'tsconfig' and '.json'`
    );
  }

  return resolve(process.cwd(), tsconfigPath);
};

export const getProjectAST = (tsConfigFilePath: string): Project =>
  new Project({ tsConfigFilePath, addFilesFromTsConfig: true });

export const getRouterModuleClass = (project: Project): ClassDeclaration => {
  const moduleImport = project
    .getSourceFiles()
    .map(file => file.getImportDeclaration('@angular/router'))
    .filter(imp => !!imp)?.[0];

  if (!moduleImport) {
    throw error("Can't find RouterModule");
  }

  const routerModuleSpec = moduleImport.getNamedImports().filter(imp => imp.getName() === 'RouterModule')?.[0];
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
    throw error(`Can't find RouterModule in ${routeDef.getFilePath()}`);
  }

  return routerModule;
};
