import { resolve } from 'path';
import { readFileSync } from 'fs';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { Project } from 'ts-morph';

import { parseRoutes } from './parse-routes';

const getWorkspace = (path: string) => JSON.parse(readFileSync(path).toString()) as WorkspaceSchema;

describe('[parse] parseRoutes', () => {
  const RELATIVE_PATH_TO_ANGULAR_JSON = '../../../angular.json';
  const ABSOLUTE_PATH_TO_ANGULAR_JSON = resolve(__dirname, RELATIVE_PATH_TO_ANGULAR_JSON);
  const relativePathToTS = '../../../fixtures/test-app/tsconfig.app.json';
  const pathToTS = resolve(__dirname, relativePathToTS);
  const CURRENT_DIR = process.cwd();

  it('should be parse project', () => {
    const PROJECT_NAME = 'test-app';
    const content = getWorkspace(ABSOLUTE_PATH_TO_ANGULAR_JSON);

    const expectedRouteMap: RouterKit.Parse.RouteTree = {
      ROOT: {
        ROOT: {},
        'second-child': {},
        'third-child-module': {
          ROOT: {},
          eager: {}
        }
      },
      help: {},
      licenses: {
        ROOT: {}
      },
      'redirect-to-root': {},
      admin: {
        ROOT: {
          ROOT: {},
          second: {},
          third: {}
        }
      }
    };

    const project = new Project({
      tsConfigFilePath: pathToTS,
      addFilesFromTsConfig: true
    });

    const workspace = content.projects[PROJECT_NAME];

    const routes = parseRoutes(workspace, project);
    expect(routes).toEqual(expectedRouteMap);
  });

  it('should be parse nx project', () => {
    const PROJECT_NAME = 'nx-app-for-routerkit';
    const pathToNxRep = './fixtures/routerkit-nx-test-app';
    process.chdir(pathToNxRep);

    const tsconfigPath = './tsconfig.base.json';
    const content = getWorkspace('./angular.json');

    const expectedRouteMap: RouterKit.Parse.RouteTree = {
      auth: {
        ROOT: {},
        'sign-in': {}
      }
    };

    const project = new Project({
      tsConfigFilePath: tsconfigPath,
      addFilesFromTsConfig: true
    });

    const workspace = content.projects[PROJECT_NAME];

    const routes = parseRoutes(workspace, project);
    expect(routes).toEqual(expectedRouteMap);

    process.chdir(CURRENT_DIR);
  });

  it('should be parse stackoverflow project', () => {
    const PROJECT_NAME = 'stackoverflow';
    const pathToStackoverflowRep = './fixtures/stackoverflow';
    process.chdir(pathToStackoverflowRep);

    const tsconfigPath = './tsconfig.base.json';
    const content = getWorkspace('./angular.json');

    const expectedRouteMap: RouterKit.Parse.RouteTree = {
      auth: {
        ROOT: {
          login: {},
          'sign-up': {},
          forgot: {},
          ROOT: {}
        }
      },
      ROOT: {},
      results: { ROOT: {} },
      answers: { ROOT: {} }
    };

    const project = new Project({
      tsConfigFilePath: tsconfigPath,
      addFilesFromTsConfig: true
    });

    const workspace = content.projects[PROJECT_NAME];

    const routes = parseRoutes(workspace, project);
    console.log(routes);
    expect(routes).toEqual(expectedRouteMap);

    process.chdir(CURRENT_DIR);
  });
});
