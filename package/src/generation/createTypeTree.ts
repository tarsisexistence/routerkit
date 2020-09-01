import * as ts from 'typescript';

import {
  createValidRouteIdentifier,
  handleRoutesWithVariable,
  hasIndexRoute,
  validateIdentifierValue
} from './createTypeTree.utils';
import { STRING_KEYWORD } from './constants';

export const createTupleType = (tuple: RouterKit.Generation.VirtualRoutesLeaf): ts.TupleTypeNode =>
  ts.createTupleTypeNode(
    tuple.map(segment =>
      segment === STRING_KEYWORD
        ? ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        : ts.createLiteralTypeNode(ts.createStringLiteral(segment))
    )
  );

export const createTypeWithIndex = (
  routes: RouterKit.Generation.VirtualRoutes
): ts.TypeLiteralNode | ts.IntersectionTypeNode => {
  const { variable, routesWithoutVariable } = handleRoutesWithVariable(routes);
  const onlyVariable = Object.keys(routesWithoutVariable).length === 0;

  return onlyVariable
    ? ts.createTypeLiteralNode([createIndexType(variable)])
    : createIntersectionType(routesWithoutVariable, variable);
};

export const createIndexType = (variable: RouterKit.Generation.RouteVariable): ts.IndexSignatureDeclaration =>
  ts.createIndexSignature(
    undefined,
    undefined,
    [
      ts.createParameter(
        undefined,
        undefined,
        undefined,
        ts.createIdentifier(validateIdentifierValue(variable.name)),
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
      )
    ],
    Array.isArray(variable.value) ? createTupleType(variable.value) : createType(variable.value)
  );

export const createIntersectionType = (
  routesWithoutVariable: RouterKit.Generation.VirtualRoutes,
  variable: RouterKit.Generation.RouteVariable
): ts.IntersectionTypeNode =>
  ts.createIntersectionTypeNode([
    createType(routesWithoutVariable),
    ts.createTypeLiteralNode([createIndexType(variable)])
  ]);

export const createType = (routes: RouterKit.Generation.VirtualRoutes): ts.TypeLiteralNode => {
  const type: ts.TypeElement[] = [];
  const keys = Object.keys(routes);

  for (const route of keys) {
    const virtualRouteValue = routes[route];
    let routeValue;

    if (Array.isArray(virtualRouteValue)) {
      routeValue = createTupleType(virtualRouteValue);
    } else if (hasIndexRoute(virtualRouteValue)) {
      routeValue = createTypeWithIndex(virtualRouteValue);
    } else {
      routeValue = createType(virtualRouteValue);
    }

    const newRecord = ts.createPropertySignature(
      undefined,
      createValidRouteIdentifier(route),
      undefined,
      routeValue,
      undefined
    );

    type.push(newRecord);
  }

  return ts.createTypeLiteralNode(type);
};

export const createTypeTree = (routes: RouterKit.Generation.VirtualRoutes): ts.TypeAliasDeclaration =>
  ts.createTypeAliasDeclaration(
    undefined,
    [ts.createModifier(ts.SyntaxKind.DeclareKeyword)],
    ts.createIdentifier('RouterKitRoutes'),
    undefined,
    hasIndexRoute(routes) ? createTypeWithIndex(routes) : createType(routes)
  );
