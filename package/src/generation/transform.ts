import { flatRoutes } from './utils';
import { isLeaf, normalizePath } from './generation.utils';
import { transformPathToState } from '../utils/routeshub.utils';
import { EMPTY_PATH } from './constants';

function transformer(
  routes: RouterKit.Generation.TransformRoutes,
  vRoutes: RouterKit.Generation.VirtualRoutes = {},
  currentTuple: string[]
): RouterKit.Generation.VirtualRoutes {
  Object.keys(routes).forEach(path => {
    const isEndRoute = Object.keys(routes[path]).length === 0;
    const isMultiPath = path.includes('/');
    const nextTuple =
      path === EMPTY_PATH || isMultiPath ? currentTuple.slice() : currentTuple.concat(normalizePath(path));

    if (isMultiPath) {
      const multiPathState = transformPathToState(path, []);
      let vRoutesNested = vRoutes;

      for (let i = 0; i < multiPathState.length; i += 1) {
        const separatePath = multiPathState[i];
        nextTuple.push(normalizePath(separatePath));

        if (i === multiPathState.length - 1) {
          if (isEndRoute) {
            vRoutesNested[separatePath] =
              separatePath in vRoutesNested
                ? {
                    ...vRoutesNested[separatePath],
                    [EMPTY_PATH]: nextTuple
                  }
                : nextTuple;
          } else {
            vRoutesNested[separatePath] = vRoutesNested[separatePath] ?? {};

            const transformedNestedRoutes = transformer(
              routes[path],
              vRoutesNested[separatePath] as RouterKit.Generation.VirtualRoutes,
              nextTuple
            );
            if (isLeaf(vRoutesNested[separatePath])) {
              (vRoutesNested[separatePath] as RouterKit.Generation.VirtualRoutes)[EMPTY_PATH] = vRoutesNested[
                separatePath
              ] as RouterKit.Generation.VirtualRoutesLeaf;
            }

            Object.keys(transformedNestedRoutes).forEach(route => {
              (vRoutesNested[separatePath] as RouterKit.Generation.VirtualRoutes)[route] =
                transformedNestedRoutes[route];
            });
          }
        } else if (isLeaf(vRoutesNested[separatePath])) {
          vRoutesNested[separatePath] = {
            [EMPTY_PATH]: vRoutesNested[separatePath]
          } as RouterKit.Generation.VirtualRoutes;
          vRoutesNested = vRoutesNested[separatePath] as RouterKit.Generation.VirtualRoutes;
        } else {
          vRoutesNested[separatePath] = vRoutesNested[separatePath] ?? {};
          vRoutesNested = vRoutesNested[separatePath] as RouterKit.Generation.VirtualRoutes;
        }
      }
    } else if (isEndRoute) {
      vRoutes[path] = path in vRoutes ? { ...vRoutes[path], [EMPTY_PATH]: nextTuple } : nextTuple;
    } else {
      const transformedNestedRoutes = transformer(
        routes[path],
        vRoutes[path] as RouterKit.Generation.VirtualRoutes,
        nextTuple
      );
      vRoutes[path] = isLeaf(vRoutes[path])
        ? ({
            [EMPTY_PATH]: vRoutes[path],
            ...transformedNestedRoutes
          } as RouterKit.Generation.VirtualRoutes)
        : transformedNestedRoutes;
    }
  });

  return vRoutes;
}

export function transform(routes: RouterKit.Generation.TransformRoutes): RouterKit.Generation.VirtualRoutes {
  const flattenRoutes = flatRoutes(routes);

  if (Object.keys(flattenRoutes).length === 0 && EMPTY_PATH in routes) {
    flattenRoutes[EMPTY_PATH] = {};
  }

  return transformer(flattenRoutes, {}, ['/']);
}
