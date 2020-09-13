import * as ts from 'typescript';

import {
  createImportRouteType,
  createStringLiteral,
  createValidRouteIdentifier,
  handleRoutesWithVariable,
  hasIndexRoute,
  validateIdentifierValue
} from './createType.utils';
import { STRING_KEYWORD } from './constants';

export const createTupleTypeNode = (tuple: RouterKit.Generation.VirtualRoutesLeaf): ts.TupleTypeNode =>
  ts.createTupleTypeNode(
    tuple.map(segment =>
      segment === STRING_KEYWORD
        ? ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        : ts.createLiteralTypeNode(createStringLiteral(segment))
    )
  );

export const createTypeReferenceNodeOfTuple = (tuple: RouterKit.Generation.VirtualRoutesLeaf) =>
  ts.createTypeReferenceNode(ts.createIdentifier('TypedRoute'), [createTupleTypeNode(tuple)]);

export const createTypeNodeWithIndex = (
  routes: RouterKit.Generation.VirtualRoutes
): ts.TypeLiteralNode | ts.IntersectionTypeNode => {
  const { variable, routesWithoutVariable } = handleRoutesWithVariable(routes);
  const onlyVariable = Object.keys(routesWithoutVariable).length === 0;

  return onlyVariable
    ? ts.createTypeLiteralNode([createIndexTypeNode(variable)])
    : createIntersectionTypeNode(routesWithoutVariable, variable);
};

export const createIndexTypeNode = (variable: RouterKit.Generation.RouteVariable): ts.IndexSignatureDeclaration =>
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
    Array.isArray(variable.value) ? createTypeReferenceNodeOfTuple(variable.value) : createTypeNode(variable.value)
  );

export const createIntersectionTypeNode = (
  routesWithoutVariable: RouterKit.Generation.VirtualRoutes,
  variable: RouterKit.Generation.RouteVariable
): ts.IntersectionTypeNode =>
  ts.createIntersectionTypeNode([
    createTypeNode(routesWithoutVariable),
    ts.createTypeLiteralNode([createIndexTypeNode(variable)])
  ]);

export const createTypeNode = (routes: RouterKit.Generation.VirtualRoutes): ts.TypeLiteralNode => {
  const type: ts.TypeElement[] = [];
  const keys = Object.keys(routes);

  for (const route of keys) {
    const virtualRouteValue = routes[route];
    let routeValue;

    if (Array.isArray(virtualRouteValue)) {
      routeValue = createTypeReferenceNodeOfTuple(virtualRouteValue);
    } else if (hasIndexRoute(virtualRouteValue)) {
      routeValue = createTypeNodeWithIndex(virtualRouteValue);
    } else {
      routeValue = createTypeNode(virtualRouteValue);
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
    [ts.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.createIdentifier('TypedRoutes'),
    undefined,
    hasIndexRoute(routes) ? createTypeNodeWithIndex(routes) : createTypeNode(routes)
  );

export const createType = (routes: RouterKit.Generation.VirtualRoutes) => [
  createImportRouteType(),
  createTypeTree(routes)
];
