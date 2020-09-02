import { STRING_KEYWORD } from './constants';
import { isIndexRoute } from './utils';

export const excludeRoot = (
  routes: RouterKit.Generation.TransformRoutes
): Omit<RouterKit.Generation.TransformRoutes, 'root'> =>
  Object.keys(routes).reduce((acc: Omit<RouterKit.Generation.TransformRoutes, 'root'>, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});

export const normalizePath = (path: string): string => (isIndexRoute(path) ? STRING_KEYWORD : path);

export const isLeaf = (node: string[] | Record<any, any>): boolean => Array.isArray(node);
