import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency } from '@schematics/angular/utility/dependencies';

import { DEPENDENCIES } from './dependencies';

export const addPackageToPackageJson = (): Rule => (host: Tree, context: SchematicContext) => {
  context.logger.info('Adding npm dependencies');

  DEPENDENCIES.forEach(({ type, version, name, overwrite }: NodeDependency) => {
    addPackageJsonDependency(host, { type, version, name, overwrite });
    context.logger.log('info', `✅️ Added "${name}" into ${type}`);
  });

  return host;
};

export const runInstall = (): Rule => (_: Tree, context: SchematicContext) => {
  context.addTask(new NodePackageInstallTask());
  context.logger.log('info', `🌀 Installing packages...`);
};

// export const setSchematicsAsDefault = (): Rule => (host: Tree, context: SchematicContext) => {
//   context.logger.info('Adding @routerkit/core to angular.json');
//   tslint:disable-next-line:no-require-imports
// const exec = require('child_process').exec;
//
// exec('ng config cli.defaultCollection @routerkit/core', () => {
//   context.logger.log('info', `✅️ Setting RouterKit Schematics as default`);
// });
// return host;
// };
