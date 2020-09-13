import { getPaths, getRoutes } from './getRoutes';

const routes = getRoutes<any>();

describe('[getters] core', () => {
  describe('getRoutes', () => {
    describe('for output', () => {
      test('should return default path', () => {
        expect(Array.from(routes)).toEqual(['/']);
      });

      test('should return first path', () => {
        expect(Array.from(routes.one)).toEqual(['/', 'one']);
      });

      test('should return two paths', () => {
        expect(Array.from(routes.one.two)).toEqual(['/', 'one', 'two']);
      });

      test('should return three paths', () => {
        expect(Array.from(routes.one.two.three)).toEqual(['/', 'one', 'two', 'three']);
      });

      test('should return three paths when values duplicated', () => {
        expect(Array.from(routes.one.one.one)).toEqual(['/', 'one', 'one', 'one']);
      });

      test('should return path with possible Array.prototype.map', () => {
        expect(Array.from(routes.one.map)).toEqual(['/', 'one', 'map']);
      });

      test('should return path with prop of possible Array.prototype.map', () => {
        expect(Array.from(routes.one.map.notMap)).toEqual(['/', 'one', 'map', 'notMap']);
      });
    });

    describe('for type', () => {
      test('should return result of array', () => {
        expect(Array.isArray(routes)).toBeTruthy();
      });

      test('should return nested result of array', () => {
        expect(Array.isArray(routes.somePath)).toBeTruthy();
      });

      test('should return deep nested result of array', () => {
        expect(Array.isArray(routes.somePath.anot)).toBeTruthy();
      });
    });

    describe('for length', () => {
      test('should return default length of 1', () => {
        expect(routes.length).toBe(1);
      });

      test('should have valid length of custom prop', () => {
        expect(routes.one.two.three.map.length).toBe(5);
      });

      test('should have valid length of array.prototype prop', () => {
        expect(routes.one.two.three.map.length).toBe(5);
      });
    });

    describe('for Array.prototype', () => {
      describe('when check value type', () => {
        test('should not be array when property from Array.prototype', () => {
          expect(Array.isArray(routes.map)).toBeFalsy();
        });

        test('should be array when property after another property from Array.prototype', () => {
          expect(Array.isArray(routes.map.myProperty)).toBeTruthy();
        });

        test('should have sequence of properties from Array.prototype of not array', () => {
          expect(Array.isArray(routes.map.reduce)).toBeFalsy();
        });

        test('should have sequence of properties from Array.prototype and custom prop of array', () => {
          expect(Array.isArray(routes.map.reduce.myProperty)).toBeTruthy();
        });

        test('should match function type', () => {
          expect(typeof routes.map).toBe('function');
        });
      });

      describe('when Array.prototype functions', () => {
        test('should do Array.prototype.map things', () => {
          expect(routes.one.two.map(v => v.toUpperCase())).toEqual(['/', 'ONE', 'TWO']);
        });

        test('should do Array.prototype.reduce things', () => {
          expect(routes.one.two.map(v => v.toUpperCase())).toEqual(['/', 'ONE', 'TWO']);
        });

        test('should do Array.prototype.concat things', () => {
          expect(routes.one.two.concat('three')).toEqual(['/', 'one', 'two', 'three']);
        });
      });
    });

    describe('for toString', () => {
      test('should have toString to string that is not array', () => {
        expect(Array.isArray(routes.toString)).toBeFalsy();
      });

      test('should have nested toString to string that is not array', () => {
        expect(Array.isArray(routes.myProp.toString)).toBeFalsy();
      });

      test('should have toString typeof function', () => {
        expect(typeof routes.toString).toBe('function');
      });

      test('should have nested toString typeof function', () => {
        expect(typeof routes.myProp.toString).toBe('function');
      });
    });

    describe('for asString', () => {
      test('should return default string', () => {
        expect(routes.asString).toBe('/');
      });

      test('should return nested string', () => {
        expect(routes.one.two.three.asString).toBe('/one/two/three');
      });

      test('should return nested string with array.prototype', () => {
        expect(routes.one.map.three.reduce.asString).toBe('/one/map/three/reduce');
      });
    });

    describe('for asArray', () => {
      test('should return default tuple', () => {
        expect(routes.asArray).toEqual(['/']);
      });

      test('should return nested tuple', () => {
        expect(routes.one.two.three.asArray).toEqual(['/', 'one', 'two', 'three']);
      });

      test('should return nested tuple with array.prototype', () => {
        expect(routes.one.map.three.reduce.asArray).toEqual(['/', 'one', 'map', 'three', 'reduce']);
      });
    });

    describe('for symbol.iterator', () => {
      describe('when spread', () => {
        test('should iterate over regular paths', () => {
          expect([...routes.one.two.three]).toEqual(['/', 'one', 'two', 'three']);
        });

        test('should iterate over paths with Array.prototype props', () => {
          expect([...routes.one.reduce]).toEqual(['/', 'one', 'reduce']);
        });

        test('should iterate over paths with multiple Array.prototype props', () => {
          expect([...routes.one.reduce.map]).toEqual(['/', 'one', 'reduce', 'map']);
        });

        test('should iterate over paths with multiple Array.prototype props and custom prop after', () => {
          expect([...routes.one.reduce.map.myProp]).toEqual(['/', 'one', 'reduce', 'map', 'myProp']);
        });
      });

      describe('when for of', () => {
        test('should iterate over regular paths', () => {
          const result = [];

          for (const item of routes.one.two.three) {
            result.push(item);
          }
          expect(result).toEqual(['/', 'one', 'two', 'three']);
        });

        test('should iterate over paths with multiple Array.prototype props and custom prop after', () => {
          const result = [];

          for (const item of routes.one.reduce.map.myProp) {
            result.push(item);
          }
          expect(result).toEqual(['/', 'one', 'reduce', 'map', 'myProp']);
        });
      });
    });
  });

  describe('getPaths', () => {
    test('should return array from array', () => {
      expect(getPaths(['/', 'a', 'b'])).toEqual(['/', 'a', 'b']);
    });

    test('should return array from empty getRoutes', () => {
      expect(getPaths(getRoutes())).toEqual(['/']);
    });

    test('should return array from getRoutes', () => {
      expect(getPaths(getRoutes<any>().a.b)).toEqual(['/', 'a', 'b']);
    });

    test('should return array from getRoutes with possible Array.prototype.map', () => {
      expect(getPaths(getRoutes<any>().map.slice)).toEqual(['/', 'map', 'slice']);
    });
  });
});
