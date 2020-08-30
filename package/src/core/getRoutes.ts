export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target, path): string[] {
      if (path === Symbol.iterator) {
        return Array.prototype[Symbol.iterator].bind(target) as string[];
      }

      return new Proxy([...target, path], this) as string[];
    }
  });

  return (proxy as unknown) as T;
};

export const getRoute = (paths: string[]): string[] => Array.from(paths);
