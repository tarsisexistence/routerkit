import {
  createValidRouteIdentifier,
  handleRoutesWithVariable,
  hasRouteVariable,
  validateIdentifierValue
} from './createTypeTree.utils';

describe('[generation] createTypeTree utils', () => {
  describe('hasRouteVariable', () => {
    test('should return false when empty object', () => {
      expect(hasRouteVariable({})).toBeFalsy();
    });

    test('should return false when object has not variables', () => {
      expect(
        hasRouteVariable({
          info: ['/', 'info'],
          location: ['/', 'location']
        })
      ).toBeFalsy();
    });

    test('should return false when object has not nested variables', () => {
      expect(
        hasRouteVariable({
          root: ['/'],
          location: { map: ['/', 'location', 'map'] }
        })
      ).toBeFalsy();
    });

    test('should return false when object has nested variable', () => {
      expect(
        hasRouteVariable({
          root: ['/'],
          location: { ':city': ['/', 'location', 'string'] }
        })
      ).toBeFalsy();
    });

    test('should return true when object has variable', () => {
      expect(
        hasRouteVariable({
          root: ['/'],
          ':city': ['/', 'string']
        })
      ).toBeTruthy();
    });
  });

  describe('handleRoutesWithVariable', () => {
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
});
