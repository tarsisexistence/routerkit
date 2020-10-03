import { resolve } from 'path';
import { readFileSync } from 'fs';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { Project } from 'ts-morph';

import { parseRoutes } from './parseRoutes';

describe('[parse] parseRoutes', () => {
  const PROJECT_NAME = 'test-app';
  const RELATIVE_PATH_TO_ANGULAR_JSON = '../../../angular.json';
  const ABSOLUTE_PATH_TO_ANGULAR_JSON = resolve(__dirname, RELATIVE_PATH_TO_ANGULAR_JSON);
  const content = JSON.parse(readFileSync(ABSOLUTE_PATH_TO_ANGULAR_JSON).toString()) as WorkspaceSchema;
  const relativePathToTS = '../../../fixtures/test-app/tsconfig.app.json';
  const pathToTS = resolve(__dirname, relativePathToTS);

  it('should be parse project', () => {
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
});
