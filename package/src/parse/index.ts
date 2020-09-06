import { Rule, Tree } from '@angular-devkit/schematics';

import { parseRoutes } from './parseRoutes';
import { generateRoutesType } from '../generation/generateRoutesType';
import { generateFile, includeRoutesTypeIntoTsconfig } from '../generation/utils';
import { findAngularJSON, getProjectAST, getProjectTsconfigPath } from './utils.angular';
import { getRoutesTypeFilePath, getTypesFileName } from './utils';
import { space } from '../utils/common.utils';

export function parse(options: RouterKit.Parse.Options): Rule {
  return (tree: Tree) => {
    const { project: projectName, dryRun } = options;

    if (!projectName) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[projectName];
    const tsconfigPath = getProjectTsconfigPath(workspace, projectName);
    const projectAST = getProjectAST(tsconfigPath);
    const parsedRoutes = parseRoutes(workspace, projectAST);
    console.log(`Routes parsed:
${JSON.stringify(parsedRoutes, null, 4)}
`);

    if (!dryRun) {
      const fileName = getTypesFileName(projectName);
      const filePath = getRoutesTypeFilePath(tsconfigPath, fileName);
      const routesType = generateRoutesType(parsedRoutes, fileName);
      console.log('Type generated.');
      generateFile({ project: projectAST, filePath, output: routesType });
      console.log(`Output generated: ${filePath}`);
      includeRoutesTypeIntoTsconfig(tsconfigPath, fileName);
      console.log(`Tsconfig is up-to-date: ${tsconfigPath}`);
    }

    space();

    return tree;
  };
}
