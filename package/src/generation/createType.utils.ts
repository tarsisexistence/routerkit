import * as ts from 'typescript';

import { isIndexRoute, isVariable, isWildcard, kebabCaseToCamelCase } from './utils';
import { PACKAGE_NAME, TYPED_ROUTE_TYPE_NAME } from './constants';

export const hasIndexRoute = (routes: RouterKit.Generation.VirtualRoutes): boolean =>
  Object.keys(routes).some(route => isIndexRoute(route));

export const handleRoutesWithVariable = (
  routes: RouterKit.Generation.VirtualRoutes
): RouterKit.Generation.RoutesWithVariable =>
  Object.keys(routes).reduce(
    (acc: RouterKit.Generation.RoutesWithVariable, key) => {
      if (isVariable(key)) {
        acc.variable = {
          name: key.slice(1),
          value: routes[key]
        };
      } else if (isWildcard(key)) {
        acc.variable =
          acc.variable.name === '' && acc.variable.value.length === 0
            ? {
                name: 'wildcard',
                value: routes[key]
              }
            : acc.variable;
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

export const createStringLiteral = (value: string): ts.StringLiteral => ts.createStringLiteral(value, true);

export const createValidRouteIdentifier = (prop: string) =>
  prop.includes('-') ? createStringLiteral(prop) : ts.createIdentifier(prop);

export const validateIdentifierValue = (prop: string): string =>
  prop.includes('-') ? kebabCaseToCamelCase(prop) : prop;

export const createImportRouteType = (): ts.ImportDeclaration =>
  ts.createImportDeclaration(
    undefined,
    undefined,
    ts.createImportClause(
      undefined,
      ts.createNamedImports([ts.createImportSpecifier(undefined, ts.createIdentifier(TYPED_ROUTE_TYPE_NAME))]),
      false
    ),
    createStringLiteral(PACKAGE_NAME)
  );
