export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target, path): string[] {
      return path === Symbol.iterator
        ? (Array.prototype[Symbol.iterator].bind(target) as string[])
        : (new Proxy([...target, path], this) as string[]);
    }
  });

  return (proxy as unknown) as T;
};

export const getPaths = (paths: string[]): string[] => Array.from(paths);
