import * as ts from 'typescript';
import { Project } from 'ts-morph';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { transform } from './transform';
import { createTypeTree } from './createTypeTree';
import { TYPES_FILENAME } from './constants';

export const generate = (
  project: Project,
  parsedRoutes: RouterKit.Generation.TransformRoutes,
  scaffoldingPath: string
): void => {
  const transformedRoutes = transform(parsedRoutes);
  const resultFile = ts.createSourceFile(
    TYPES_FILENAME,
    '',
    ts.ScriptTarget.Latest
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printNode(
    ts.EmitHint.Unspecified,
    createTypeTree(transformedRoutes),
    resultFile
  );

  console.log(result);

  const path = resolve(scaffoldingPath, TYPES_FILENAME);
  project.createSourceFile(path, result, { overwrite: true }).saveSync();
};

export const includeRoutesTypeIntoTsconfig = (tsconfigPath: string): void => {
  const tsconfigFile = readFileSync(tsconfigPath);
  const tsconfigJson: { include?: string[] } = JSON.parse(
    tsconfigFile.toString()
  );

  if (tsconfigJson.include === undefined) {
    tsconfigJson.include = [];
  }

  if (!tsconfigJson.include.includes(TYPES_FILENAME)) {
    tsconfigJson.include.push(TYPES_FILENAME);
  }

  writeFileSync(tsconfigPath, JSON.stringify(tsconfigJson, null, 2));
};
