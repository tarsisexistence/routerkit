import { NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

// TODO: very brittle, depends on file location
// tslint:disable-next-line:no-require-imports no-var-requires
const packageJson = require('../package.json');

export enum PACKAGES {
  CORE = '@routerkit/core'
}

export const DEPENDENCIES: NodeDependency[] = [
  {
    name: PACKAGES.CORE,
    type: NodeDependencyType.Dev,
    version: `^${packageJson.version}`,
    overwrite: true
  }
];
