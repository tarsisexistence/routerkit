import { readFileSync, writeFileSync } from 'fs';

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
