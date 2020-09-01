import * as ts from 'typescript';

import { kebabCaseToCamelCase } from './utils';

export const hasRouteVariable = (routes: RouterKit.Generation.VirtualRoutes): boolean =>
  Object.keys(routes).some(route => route[0] === ':');

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

export const createValidRouteIdentifier = (prop: string) =>
  prop.includes('-') ? ts.createStringLiteral(prop) : ts.createIdentifier(prop);

export const validateIdentifierValue = (prop: string): string =>
  prop.includes('-') ? kebabCaseToCamelCase(prop) : prop;
