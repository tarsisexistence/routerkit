export interface Schema {
  project: string;
  dryRun: boolean;
}

export interface Alias {
  originPath: string;
  withoutAsterisk: string;
}

export type RouterExpression = 'forRoot' | 'forChild';

export interface LoadChildren {
  path: string;
  moduleName: string;
}

export type RouteTree = Record<string, any>;
