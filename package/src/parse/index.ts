import { Rule, Tree } from '@angular-devkit/schematics';

import { parseRoutes } from './parseRoutes';
import { generateRoutesType } from '../generation/generateRoutesType';
import { generateFile, includeRoutesTypeIntoTsconfig } from '../generation/utils';
import { findAngularJSON, getProjectAST, getProjectTsconfigPath } from './utils.angular';
import { getRoutesTypeFilePath, getTypesFileName } from './utils';

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

    if (dryRun) {
      console.log(parsedRoutes);
    } else {
      const fileName = getTypesFileName(projectName);
      const filePath = getRoutesTypeFilePath(tsconfigPath, fileName);
      const routesType = generateRoutesType(parsedRoutes, fileName);
      console.log(routesType);
      generateFile({ project: projectAST, filePath, output: routesType });
      includeRoutesTypeIntoTsconfig(tsconfigPath, fileName);
    }

    return tree;
  };
}
