import { STRING_KEYWORD } from './constants';

export const excludeRoot = (
  routes: RouterKit.Generation.TransformRoutes
): Omit<RouterKit.Generation.TransformRoutes, 'root'> =>
  Object.keys(routes).reduce((acc: Omit<RouterKit.Generation.TransformRoutes, 'root'>, route) => {
    if (route !== 'root') {
      acc[route] = routes[route];
    }

    return acc;
  }, {});

// TODO: 'string' signature possibly not safe
export const normalizePath = (path: string): string => (path[0] === ':' ? STRING_KEYWORD : path);

export const isLeaf = (node: string[] | Record<any, any>): boolean => Array.isArray(node);
