export const getRouteFromPaths = (paths: string[]): string => {
  if (paths.length === 1) {
    return paths[0];
  }

  let route = '';

  for (let i = 1; i < paths.length; i += 1) {
    route += `/${paths[i]}`;
  }

  return route;
};
