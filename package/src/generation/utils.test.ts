import { flatRoutes, kebabCaseToCamelCase } from './utils';

describe('[generation] utils', () => {
  describe('[generation] flatRoutes', () => {
    test('should return the same when no root', () => {
      expect(
        flatRoutes({
          home: {},
          location: {}
        })
      ).toEqual({
        home: {},
        location: {}
      });
    });

    test('should return the same when empty root', () => {
      expect(
        flatRoutes({
          root: {},
          home: {},
          location: {}
        })
      ).toEqual({
        root: {},
        home: {},
        location: {}
      });
    });

    test('should flat one lvl deep nested routes inside root', () => {
      expect(
        flatRoutes({
          root: {
            map: {},
            car: {}
          },
          home: {},
          location: {}
        })
      ).toEqual({
        location: {},
        home: {},
        map: {},
        car: {}
      });
    });

    test('should flat one lvl deep nested routes inside root with empty root', () => {
      expect(
        flatRoutes({
          root: {
            root: {},
            map: {},
            car: {}
          },
          home: {},
          location: {}
        })
      ).toEqual({
        root: {},
        location: {},
        home: {},
        map: {},
        car: {}
      });
    });

    test('should flat two lvl deep nested routes inside root', () => {
      expect(
        flatRoutes({
          root: {
            root: {
              map: {},
              car: {}
            }
          },
          home: {},
          location: {}
        })
      ).toEqual({
        location: {},
        home: {},
        map: {},
        car: {}
      });
    });

    test('should flat two lvl deep nested routes inside root with empty root', () => {
      expect(
        flatRoutes({
          root: {
            root: {
              root: {},
              map: {},
              car: {}
            }
          },
          home: {},
          location: {}
        })
      ).toEqual({
        root: {},
        location: {},
        home: {},
        map: {},
        car: {}
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
              map: {},
              car: {}
            }
          },
          home: {},
          location: {}
        })
      ).toEqual({
        nest: {},
        location: {},
        home: {},
        map: {},
        car: {}
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
