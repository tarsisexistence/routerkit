declare namespace RouterKit.Parse {
  interface Options {
    project: string;
    dryRun: boolean;
  }

  interface Alias {
    originPath: string;
    withoutAsterisk: string;
  }

  type RouterExpression = 'forRoot' | 'forChild';

  interface LoadChildren {
    path: string;
    moduleName: string;
  }

  type RouteTree = Record<string, any>;
}
