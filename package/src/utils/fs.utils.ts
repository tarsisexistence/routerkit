import { resolve } from 'path';
import { existsSync } from 'fs';

export function findFilePath(possiblePath: string): string | null {
  const isPathTooSmall = possiblePath.length < 10;

  if (isPathTooSmall) {
    return null;
  }

  return existsSync(resolve(possiblePath, 'angular.json')) ? possiblePath : findFilePath(resolve(possiblePath, '..'));
}
