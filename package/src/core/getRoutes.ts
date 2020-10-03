import { getRouteFromPaths } from './getRoutes.utils';
import { EMPTY_PATH } from '../generation/constants';

export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target: string[], path): string[] {
      const targetArray = Array.from(target);

      switch (true) {
        // TODO: add warning about potential mistake when some route "length" path
        case path === 'length':
          return targetArray.length as any;

        case path === 'toString':
          return (() => getRouteFromPaths(targetArray)) as any;

        case path === 'asString':
          return getRouteFromPaths(targetArray) as any;

        case path === 'asArray': {
          return Array.from(targetArray);
        }

        case path === Symbol.iterator:
          return Array.prototype[Symbol.iterator].bind(targetArray);

        case path in targetArray: {
          const updatedTargetPath = Array.prototype[path as any].bind(targetArray);
          Object.defineProperty(updatedTargetPath, 'length', { get: () => targetArray.length + 1 });
          const nextTuple = [...targetArray, path];
          updatedTargetPath[Symbol.iterator] = Array.prototype[Symbol.iterator].bind(nextTuple);

          for (let i = 0; i < nextTuple.length; i += 1) {
            updatedTargetPath[i] = nextTuple[i];
          }

          return new Proxy(updatedTargetPath, this);
        }

        default: {
          const nextTuple = path === EMPTY_PATH ? targetArray : [...targetArray, path];
          return new Proxy(nextTuple, this) as string[];
        }
      }
    }
  });

  return (proxy as unknown) as T;
};

export const getPaths = (paths: string[]): string[] => Array.from(paths);
