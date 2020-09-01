import { Rule, Tree } from '@angular-devkit/schematics';

import { parseRoutes } from './parseRoutes';
import { generate } from '../generation/generate';
import { includeRoutesTypeIntoTsconfig } from '../generation/utils';
import { findAngularJSON, getProjectAST, getProjectTsconfigPath } from './utils.angular';
import { getRoutesTypeFilePath, getTypesFileName } from './utils';

export function parse(options: RouterKit.Parse.Options): Rule {
  return (tree: Tree) => {
    const { project: projectName, printOnly } = options;

    if (!projectName) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[projectName];
    const tsconfigPath = getProjectTsconfigPath(workspace, projectName);
    const projectAST = getProjectAST(tsconfigPath);
    const parsedRoutes = parseRoutes(workspace, projectAST);

    if (printOnly) {
      console.log(parsedRoutes);
    } else {
      const fileName = getTypesFileName(projectName);
      const filePath = getRoutesTypeFilePath(tsconfigPath, fileName);
      generate(projectAST, parsedRoutes, filePath);
      includeRoutesTypeIntoTsconfig(tsconfigPath, fileName);
    }

    return tree;
  };
}
