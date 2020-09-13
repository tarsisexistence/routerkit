export type TypedRoute<T extends string[]> = T & {
  // TODO: https://github.com/microsoft/TypeScript/pull/40336#issuecomment-691095096
  toString: () => string;
  // TODO: https://github.com/microsoft/TypeScript/pull/40336#issuecomment-691095096
  asString: string;
  asArray: T;
};
