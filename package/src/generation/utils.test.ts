import { flatRoutes, kebabCaseToCamelCase } from './utils';

describe('[generation] utils', () => {
  describe('flatRoutes', () => {
    test('should not flat when empty', () => {
      expect(flatRoutes({})).toEqual({});
    });

    test('should flat single root', () => {
      expect(flatRoutes({ ROOT: {} })).toEqual({});
    });

    test('should not flat when no root', () => {
      expect(
        flatRoutes({
          a: {},
          b: {},
          c: {}
        })
      ).toEqual({ a: {}, b: {}, c: {} });
    });

    test('should not flat when root is empty', () => {
      expect(
        flatRoutes({
          ROOT: {},
          a: {},
          b: {}
        })
      ).toEqual({ ROOT: {}, a: {}, b: {} });
    });

    test('should flat root on next level', () => {
      expect(
        flatRoutes({
          a: { ROOT: {} }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should flat nested route of root', () => {
      expect(
        flatRoutes({
          ROOT: { a: {} }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should not flat root on next level when there is another route', () => {
      expect(
        flatRoutes({
          a: { ROOT: {}, b: {} }
        })
      ).toEqual({
        a: { ROOT: {}, b: {} }
      });
    });

    test('should flat root on next level with another route', () => {
      expect(
        flatRoutes({
          ROOT: { ROOT: {}, b: {} }
        })
      ).toEqual({
        ROOT: {},
        b: {}
      });
    });

    test('should flat second level of nesting', () => {
      expect(
        flatRoutes({
          a: { ROOT: { ROOT: {} } }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should flat second level of nesting nesting with other routes', () => {
      expect(
        flatRoutes({
          a: { ROOT: { ROOT: { b: {}, c: {} } } }
        })
      ).toEqual({
        a: { b: {}, c: {} }
      });
    });

    test('should flat second level of nesting nesting with other routes and root', () => {
      expect(
        flatRoutes({
          a: { ROOT: { ROOT: { ROOT: {}, b: {}, c: {} } } }
        })
      ).toEqual({
        a: { ROOT: {}, b: {}, c: {} }
      });
    });

    test('should flat two lvl deep nested routes inside root with root', () => {
      expect(
        flatRoutes({
          ROOT: {
            ROOT: {
              ROOT: {
                nest: {}
              },
              a: {},
              b: {}
            }
          },
          c: {},
          d: {}
        })
      ).toEqual({
        a: {},
        b: {},
        c: {},
        d: {},
        nest: {}
      });
    });

    test('should not flat route with path root', () => {
      expect(
        flatRoutes({
          root: {
            root: {}
          }
        })
      ).toEqual({
        root: {
          root: {}
        }
      });
    });
  });

  describe('kebabCaseToCamelCase', () => {
    test('should return as is', () => {
      expect(kebabCaseToCamelCase('mysuperstring')).toBe('mysuperstring');
    });

    test('should transform into camelCase with one dash', () => {
      expect(kebabCaseToCamelCase('my-superstring')).toBe('mySuperstring');
    });

    test('should transform into camelCase with multiple dashes', () => {
      expect(kebabCaseToCamelCase('my-super-string')).toBe('mySuperString');
    });
  });
});
