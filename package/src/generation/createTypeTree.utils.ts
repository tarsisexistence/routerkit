export const hasRouteVariable = (
  routes: RouterKit.Generation.VirtualRoutes
): boolean => Object.keys(routes).some(route => route[0] === ':');

export const handleRoutesWithVariable = (
  routes: RouterKit.Generation.VirtualRoutes
): RouterKit.Generation.RoutesWithVariable =>
  Object.keys(routes).reduce(
    (acc: RouterKit.Generation.RoutesWithVariable, key) => {
      if (key[0] === ':') {
        acc.variable = {
          name: key.slice(1),
          value: routes[key]
        };
      } else {
        acc.routesWithoutVariable[key] = routes[key];
      }

      return acc;
    },
    {
      variable: { name: '', value: [] },
      routesWithoutVariable: {}
    }
  );
