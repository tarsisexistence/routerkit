import * as ora from 'ora';
import { Rule, Tree } from '@angular-devkit/schematics';

import { parseRoutes } from './parseRoutes';
import { generateRoutesType } from '../generation/generateRoutesType';
import { generateFile } from '../generation/utils';
import { findAngularJSON, getProjectAST, getProjectTsconfigPath } from './utils.angular';
import { getRoutesTypeFilePath, getTypesFileName } from './utils';
import { space, taskFinish, taskStart } from '../utils/common.utils';

export function parse(options: RouterKit.Parse.Schema): Rule {
  return (tree: Tree) => {
    const startTime = Date.now();
    const { project: projectName, dryRun } = options;

    if (!projectName) {
      throw new Error('Project name expected.');
    }

    const projectSpinner = ora(taskStart('Analyzing project')).start();
    const startAnalyzing = Date.now();
    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[projectName];
    const tsconfigPath = getProjectTsconfigPath(workspace, projectName);
    const projectAST = getProjectAST(tsconfigPath);
    const endAnalyzing = Date.now();
    console.log('Analyze phase: ', endAnalyzing - startAnalyzing);
    projectSpinner.succeed(taskFinish('Project analyzed'));

    const parsingSpinner = ora(taskStart('Parsing routes')).start();
    const start = Date.now();
    const parsedRoutes = parseRoutes(workspace, projectAST);
    const end = Date.now();
    console.log('Parsed time: ', end - start);
    parsingSpinner.succeed(taskFinish('Routes parsed', JSON.stringify(parsedRoutes, null, 4)));

    if (!dryRun) {
      const generatingTypeSpinner = ora(taskStart('Generating type')).start();
      const fileName = getTypesFileName(projectName);
      const filePath = getRoutesTypeFilePath(tsconfigPath, fileName);
      const routesType = generateRoutesType(parsedRoutes, fileName);
      generatingTypeSpinner.succeed(taskFinish('Type generated'));

      const generatingFileSpinner = ora(taskStart('Generating type')).start();
      generateFile({ project: projectAST, filePath, output: routesType });
      generatingFileSpinner.succeed(taskFinish('Output generated', filePath));

      /**
       * TODO: resolve later
       * const updatingTsconfigSpinner = ora(taskStart('Generating type')).start();
       * includeRoutesTypeIntoTsconfig(tsconfigPath, fileName);
       * updatingTsconfigSpinner.succeed(taskFinish('Project tsconfig is up-to-date', tsconfigPath));
       */
    }

    const endTime = Date.now();
    console.log('Whole time: ', endTime - startTime);

    space();

    return tree;
  };
}
