import { getRouteFromPaths } from './getRoutes.utils';

export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target, path): string[] {
      switch (path) {
        case 'toString':
          return (() => getRouteFromPaths(target)) as any;

        case 'asString':
          return getRouteFromPaths(target) as any;

        case 'asArray': {
          return Array.from(target);
        }

        case Symbol.iterator:
          return Array.prototype[Symbol.iterator].bind(target) as any;

        default:
          return new Proxy([...target, path as string], this) as string[];
      }
    }
  });

  return (proxy as unknown) as T;
};

export const getPaths = (paths: string[]): string[] => Array.from(paths);
