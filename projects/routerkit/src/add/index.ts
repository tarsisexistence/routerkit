import { chain, noop, Rule } from '@angular-devkit/schematics';

import { addPackageToPackageJson, runInstall } from './tasks';

export const ngAdd = (options: RouterKit.Add.Schema): Rule =>
  chain([addPackageToPackageJson(), options.skipInstall ? noop() : runInstall()]);
