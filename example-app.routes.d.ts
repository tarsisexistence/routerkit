import { TypedRoute } from '@routerkit/core';
export type TypedRoutes = {
  ROOT: TypedRoute<['/']>;
  about: TypedRoute<['/', 'about']>;
  car: {
    details: TypedRoute<['/', 'car', 'details']>;
    info: {
      info: TypedRoute<['/', 'car', 'info', 'info']>;
    };
    ROOT: TypedRoute<['/', 'car']>;
    engine: {
      [years: string]: TypedRoute<['/', 'car', 'engine', string]>;
    };
  };
  home: TypedRoute<['/', 'home']>;
  users: {
    ROOT: TypedRoute<['/', 'users']>;
  } & {
    [id: string]: {
      ROOT: TypedRoute<['/', 'users', string]>;
      profile: TypedRoute<['/', 'users', string, 'profile']>;
    };
  };
};
