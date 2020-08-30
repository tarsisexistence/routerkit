import {
  handleRoutesWithVariable,
  hasRouteVariable
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
});
