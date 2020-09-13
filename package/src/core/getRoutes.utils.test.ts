import { getRouteFromPaths } from './getRoutes.utils';

describe('[getters.utils] core', () => {
  describe('getRouteFromPaths', () => {
    test('should return empty string', () => {
      expect(getRouteFromPaths([])).toBe('');
    });

    test('should return default route', () => {
      expect(getRouteFromPaths(['/'])).toBe('/');
    });

    test('should return string of one path', () => {
      expect(getRouteFromPaths(['some-path'])).toBe('some-path');
    });

    test('should return route', () => {
      expect(getRouteFromPaths(['/', 'profile', 'users', '5'])).toBe('/profile/users/5');
    });
  });
});
