import { RouteTree } from 'shared';

export const mergeRouteTrees = (left: RouteTree, right: RouteTree, mutableRoot: RouteTree = {}): RouteTree => {
  const unionProps = getUnionArrayOfProps(left, right);
  for (const prop of unionProps) {
    mutableRoot[prop] = {};
    mergeRouteTrees(left[prop] ?? {}, right[prop] ?? {}, mutableRoot[prop]);
  }

  return mutableRoot;
};

const getUnionArrayOfProps = (left: RouteTree, right: RouteTree): Set<string> => {
  const leftProps = Object.keys(left);
  const rightProps = Object.keys(right);

  return new Set([...leftProps, ...rightProps]);
};
