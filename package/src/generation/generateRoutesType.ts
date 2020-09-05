import * as ts from 'typescript';

import { transform } from './transform';
import { createTypeTree } from './createTypeTree';

export const generateRoutesType = (
  parsedRoutes: RouterKit.Generation.TransformRoutes,
  fileName: string
): string => {
  const transformedRoutes = transform(parsedRoutes);
  const resultFile = ts.createSourceFile(fileName, '', ts.ScriptTarget.Latest);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, createTypeTree(transformedRoutes), resultFile);
};
