import {
  createImportRouteType,
  createStringLiteral,
  createValidRouteIdentifier,
  handleRoutesWithVariable,
  hasIndexRoute,
  validateIdentifierValue
} from './createType.utils';

describe('[generation] createType utils', () => {
  describe('hasIndexRoute', () => {
    test('should return false when empty object', () => {
      expect(hasIndexRoute({})).toBeFalsy();
    });

    test('should return false when object has not variables', () => {
      expect(
        hasIndexRoute({
          info: ['/', 'info'],
          location: ['/', 'location']
        })
      ).toBeFalsy();
    });

    test('should return false when object has not nested variables', () => {
      expect(
        hasIndexRoute({
          root: ['/'],
          location: { map: ['/', 'location', 'map'] }
        })
      ).toBeFalsy();
    });

    test('should return false when object has nested variable', () => {
      expect(
        hasIndexRoute({
          root: ['/'],
          location: { ':city': ['/', 'location', 'string'] }
        })
      ).toBeFalsy();
    });

    test('should return true when object has variable', () => {
      expect(
        hasIndexRoute({
          root: ['/'],
          ':city': ['/', 'string']
        })
      ).toBeTruthy();
    });

    test('should return true when object has wildcard of *', () => {
      expect(
        hasIndexRoute({
          root: ['/'],
          '**': ['/', 'string']
        })
      ).toBeTruthy();
    });
  });

  describe('handleRoutesWithVariable', () => {
    test('should have empty routesWithoutVariable', () => {
      expect(
        handleRoutesWithVariable({
          ':city': ['/', 'string']
        })
      ).toEqual({
        routesWithoutVariable: {},
        variable: { name: 'city', value: ['/', 'string'] }
      });
    });

    test('should return both routes without variable and variable data', () => {
      expect(
        handleRoutesWithVariable({
          info: ['/', 'info'],
          ':city': ['/', 'string']
        })
      ).toEqual({
        routesWithoutVariable: { info: ['/', 'info'] },
        variable: { name: 'city', value: ['/', 'string'] }
      });
    });

    test('should return variable instead wildcard', () => {
      expect(
        handleRoutesWithVariable({
          info: ['/', 'info'],
          ':city': ['/', 'string'],
          '**': ['/', 'string']
        })
      ).toEqual({
        routesWithoutVariable: { info: ['/', 'info'] },
        variable: { name: 'city', value: ['/', 'string'] }
      });
    });

    test('should return variable instead wildcard when wildcard is first', () => {
      expect(
        handleRoutesWithVariable({
          '**': ['/', 'string'],
          ':city': ['/', 'string'],
          info: ['/', 'info']
        })
      ).toEqual({
        routesWithoutVariable: { info: ['/', 'info'] },
        variable: { name: 'city', value: ['/', 'string'] }
      });
    });

    test('should return wildcard', () => {
      expect(
        handleRoutesWithVariable({
          info: ['/', 'info'],
          '**': ['/', 'string']
        })
      ).toEqual({
        routesWithoutVariable: { info: ['/', 'info'] },
        variable: { name: 'wildcard', value: ['/', 'string'] }
      });
    });
  });

  describe('createStringLiteral', () => {
    test('should match snapshot', () => {
      expect(createStringLiteral('someString')).toMatchSnapshot();
    });
  });

  describe('createValidRouteIdentifier', () => {
    test('should match createIdentifier', () => {
      expect(createValidRouteIdentifier('info')).toMatchSnapshot();
    });

    test('should match createStringLiteral when literal has "-" char', () => {
      expect(createValidRouteIdentifier('user-center')).toMatchSnapshot();
    });
  });

  describe('validateIdentifierValue', () => {
    test('should return as is when string is valid', () => {
      expect(validateIdentifierValue('info')).toBe('info');
    });

    test('should return camelCase when string is invalid', () => {
      expect(validateIdentifierValue('user-center')).toBe('userCenter');
    });
  });

  describe('createImportRouteType', () => {
    test('should match snapshot', () => {
      expect(createImportRouteType()).toMatchSnapshot();
    });
  });
});
