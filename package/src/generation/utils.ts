import { readFileSync, writeFileSync } from 'fs';
import { Project } from 'ts-morph';

import { excludeRoot } from './generation.utils';

export function flatRoutes(
  routes: RouterKit.Generation.TransformRoutes
): Omit<RouterKit.Generation.TransformRoutes, 'root'> {
  if (routes.root === undefined) {
    return routes;
  }

  const flattenRoutes = flatRoutes(routes.root);

  const normalizedRoutes = Object.keys(routes.root).length > 0 ? excludeRoot(routes) : routes;

  return {
    ...normalizedRoutes,
    ...flattenRoutes
  };
}

export const includeRoutesTypeIntoTsconfig = (tsconfigPath: string, fileName: string): void => {
  const tsconfigFile = readFileSync(tsconfigPath);
  const tsconfigJson: { include?: string[] } = JSON.parse(tsconfigFile.toString());

  if (tsconfigJson.include === undefined) {
    tsconfigJson.include = [];
  }

  if (!tsconfigJson.include.includes(fileName)) {
    tsconfigJson.include.push(fileName);
  }

  writeFileSync(tsconfigPath, JSON.stringify(tsconfigJson, null, 2));
};

export const kebabCaseToCamelCase = (prop: string): string => {
  let str = '';
  const segments = prop.split('-');
  str = segments[0];

  for (let i = 1; i < segments.length; i += 1) {
    const segment = segments[i];

    str += `${segment[0].toUpperCase()}${segment.slice(1).toLowerCase()}`;
  }

  return str;
};

export const isVariable = (route: string): boolean => route[0] === ':';
export const isWildcard = (route: string): boolean => route.slice(0, 2) === '**';
export const isIndexRoute = (route: string): boolean => isVariable(route) || isWildcard(route);

export const generateFile = ({
  project,
  filePath,
  output
}: {
  project: Project;
  filePath: string;
  output: string;
}): void => {
  project.createSourceFile(filePath, output, { overwrite: true }).saveSync();
};
