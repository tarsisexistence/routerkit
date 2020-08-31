import { Rule, Tree } from '@angular-devkit/schematics';

import { findAngularJSON, getProjectAST, getProjectTsconfigPath, getScaffoldingPath } from './utils.angular';
import { parseRoutes } from './parseRoutes';
import { generate, includeRoutesTypeIntoTsconfig } from '../generation/generate';

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
      const scaffoldingPath = getScaffoldingPath(tsconfigPath);
      generate(projectAST, parsedRoutes, scaffoldingPath);
      includeRoutesTypeIntoTsconfig(tsconfigPath);
    }

    return tree;
  };
}
