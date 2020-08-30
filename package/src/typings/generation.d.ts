declare namespace RouterKit.Generation {
  // tslint:disable-next-line:interface-over-type-literal
  type TransformRoutesLeaf = {};

  interface TransformRoutes {
    [route: string]: TransformRoutes | TransformRoutesLeaf;
    root?: TransformRoutes | TransformRoutesLeaf;
  }

  type VirtualRoutesLeaf = string[];

  interface VirtualRoutes {
    [route: string]: VirtualRoutes | VirtualRoutesLeaf;
    root?: VirtualRoutesLeaf;
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
