import { TypedRoute } from '@routerkit/core';
export type TypedRoutes = {
    ROOT: TypedRoute<[
        '/'
    ]>;
    about: TypedRoute<[
        '/',
        'about'
    ]>;
    car: {
        ROOT: TypedRoute<[
            '/',
            'car'
        ]>;
        engine: {
            [year: string]: TypedRoute<[
                '/',
                'car',
                'engine',
                string
            ]>;
        };
        details: TypedRoute<[
            '/',
            'car',
            'details'
        ]>;
        info: {
            info: TypedRoute<[
                '/',
                'car',
                'info',
                'info'
            ]>;
        };
    };
    home: TypedRoute<[
        '/',
        'home'
    ]>;
    users: {
        ROOT: TypedRoute<[
            '/',
            'users'
        ]>;
    } & {
        [id: string]: {
            ROOT: TypedRoute<[
                '/',
                'users',
                string
            ]>;
            profile: TypedRoute<[
                '/',
                'users',
                string,
                'profile'
            ]>;
        };
    };
};
