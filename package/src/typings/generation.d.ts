declare namespace RouterKit.Generation {
  // tslint:disable-next-line:interface-over-type-literal
  type TransformRoutesLeaf = {};

  interface TransformRoutes {
    [route: string]: TransformRoutes | TransformRoutesLeaf;
    ROOT?: TransformRoutes | TransformRoutesLeaf;
  }

  type VirtualRoutesLeaf = string[];

  interface VirtualRoutes {
    [route: string]: VirtualRoutes | VirtualRoutesLeaf;
    ROOT?: VirtualRoutesLeaf;
  }

  interface RouteVariable {
    name: string;
    value: VirtualRoutesLeaf | VirtualRoutes;
  }

  interface RoutesWithVariable {
    variable: RouteVariable;
    routesWithoutVariable: VirtualRoutes;
  }
}
