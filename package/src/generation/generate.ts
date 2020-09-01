import * as ts from 'typescript';
import { Project } from 'ts-morph';

import { transform } from './transform';
import { createTypeTree } from './createTypeTree';

export const generate = (
  project: Project,
  parsedRoutes: RouterKit.Generation.TransformRoutes,
  filePath: string
): void => {
  const transformedRoutes = transform(parsedRoutes);
  const resultFile = ts.createSourceFile(filePath, '', ts.ScriptTarget.Latest);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printNode(ts.EmitHint.Unspecified, createTypeTree(transformedRoutes), resultFile);

  console.log(result);

  project.createSourceFile(filePath, result, { overwrite: true }).saveSync();
};
