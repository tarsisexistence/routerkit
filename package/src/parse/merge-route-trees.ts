export const mergeRouteTrees = (
  left: RouterKit.Parse.RouteTree,
  right: RouterKit.Parse.RouteTree,
  mutableRoot: RouterKit.Parse.RouteTree = {}
): RouterKit.Parse.RouteTree => {
  const unionProps = getUnionArrayOfProps(left, right);
  for (const prop of unionProps) {
    mutableRoot[prop] = {};
    mergeRouteTrees(left[prop] ?? {}, right[prop] ?? {}, mutableRoot[prop]);
  }

  return mutableRoot;
};

const getUnionArrayOfProps = (left: RouterKit.Parse.RouteTree, right: RouterKit.Parse.RouteTree): Set<string> => {
  const leftProps = Object.keys(left);
  const rightProps = Object.keys(right);

  return new Set([...leftProps, ...rightProps]);
};
