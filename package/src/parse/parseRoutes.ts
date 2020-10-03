import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
import { Project } from 'ts-morph';

import { createProjectRouteTree, getAppModule, getRouteModuleForRootExpressions } from './utils';
import { getRouterModuleClass } from './utils.angular';
import { error } from '../utils/common.utils';

export const parseRoutes = (workspace: WorkspaceProject, project: Project): RouterKit.Parse.RouteTree => {
  const pathToMainFile = workspace.architect?.build?.options?.main as string;

  if (!pathToMainFile) {
    throw error("Can't find path to main.ts in angular.json");
  }

  const appModule = getAppModule(project, pathToMainFile);

  // todo rewrite this part
  const routerModuleClass = getRouterModuleClass(project);
  const routerType = routerModuleClass.getType();
  const expression = getRouteModuleForRootExpressions(routerModuleClass);

  if (expression) {
    return createProjectRouteTree(project, appModule, expression, routerType);
  } else {
    throw error("RouterModule.forRoot expression did't find");
  }
};
