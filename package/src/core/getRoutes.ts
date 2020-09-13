import { getRouteFromPaths } from './getRoutes.utils';

export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target: string[], path): string[] {
      target = Array.from(target);

      switch (true) {
        // TODO: add warning about potential mistake when some route "length" path
        case path === 'length':
          return target.length as any;

        case path === 'toString':
          return (() => getRouteFromPaths(target)) as any;

        case path === 'asString':
          return getRouteFromPaths(target) as any;

        case path === 'asArray': {
          return Array.from(target);
        }

        case path === Symbol.iterator:
          return Array.prototype[Symbol.iterator].bind(target);

        case target[path as any] !== undefined: {
          const updatedTargetPath = Array.prototype[path as any].bind(target);
          Object.defineProperty(updatedTargetPath, 'length', { get: () => target.length + 1 });
          const nextTuple = [...target, path];
          updatedTargetPath[Symbol.iterator] = Array.prototype[Symbol.iterator].bind(nextTuple);

          for (let i = 0; i < nextTuple.length; i += 1) {
            updatedTargetPath[i] = nextTuple[i];
          }

          return new Proxy(updatedTargetPath, this);
        }

        default:
          return new Proxy([...target, path], this) as string[];
      }
    }
  });

  return (proxy as unknown) as T;
};

export const getPaths = (paths: string[]): string[] => Array.from(paths);
