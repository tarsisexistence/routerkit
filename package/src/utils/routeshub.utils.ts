/**
 * Prevents to record multi path in the state
 */
export const transformPathToState = (
  path: string,
  state: string[] = ['/']
): string[] => {
  const paths = path
    .split('/')
    .filter((segment: string) => segment.length > 0 && segment !== '/');
  return state.concat(paths);
};
