import * as ts from 'typescript';

import { transform } from './transform';
import { createType } from './createType';

export const generateRoutesType = (parsedRoutes: RouterKit.Generation.TransformRoutes, fileName: string): string => {
  const resultFile = ts.createSourceFile(fileName, '', ts.ScriptTarget.Latest);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const transformedRoutes = transform(parsedRoutes);

  return printer.printList(1 /* MultiLine */, createType(transformedRoutes) as any, resultFile);
};
