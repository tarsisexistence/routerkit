import { flatRoutes, kebabCaseToCamelCase } from './utils';

describe('[generation] utils', () => {
  describe('flatRoutes', () => {
    test('should not flat when empty', () => {
      expect(flatRoutes({})).toEqual({});
    });

    test('should flat single root', () => {
      expect(flatRoutes({ root: {} })).toEqual({});
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
          root: {},
          a: {},
          b: {}
        })
      ).toEqual({ root: {}, a: {}, b: {} });
    });

    test('should flat root on next level', () => {
      expect(
        flatRoutes({
          a: { root: {} }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should flat nested route of root', () => {
      expect(
        flatRoutes({
          root: { a: {} }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should not flat root on next level when there is another route', () => {
      expect(
        flatRoutes({
          a: { root: {}, b: {} }
        })
      ).toEqual({
        a: { root: {}, b: {} }
      });
    });

    test('should flat root on next level with another route', () => {
      expect(
        flatRoutes({
          root: { root: {}, b: {} }
        })
      ).toEqual({
        root: {},
        b: {}
      });
    });

    test('should flat second level of nesting', () => {
      expect(
        flatRoutes({
          a: { root: { root: {} } }
        })
      ).toEqual({
        a: {}
      });
    });

    test('should flat second level of nesting nesting with other routes', () => {
      expect(
        flatRoutes({
          a: { root: { root: { b: {}, c: {} } } }
        })
      ).toEqual({
        a: { b: {}, c: {} }
      });
    });

    test('should flat second level of nesting nesting with other routes and root', () => {
      expect(
        flatRoutes({
          a: { root: { root: { root: {}, b: {}, c: {} } } }
        })
      ).toEqual({
        a: { root: {}, b: {}, c: {} }
      });
    });

    test('should flat two lvl deep nested routes inside root with root', () => {
      expect(
        flatRoutes({
          root: {
            root: {
              root: {
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
