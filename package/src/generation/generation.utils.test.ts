import { excludeRoot } from './generation.utils';

describe('[generation] utils', () => {
  describe('excludeRoot', () => {
    test('should return the same data when there is no root prop', () => {
      expect(
        excludeRoot({
          home: {},
          location: {}
        })
      ).toEqual({
        home: {},
        location: {}
      });
    });

    test('should return return data without root prop', () => {
      expect(
        excludeRoot({
          root: {},
          home: {},
          location: {}
        })
      ).toEqual({
        home: {},
        location: {}
      });
    });
  });
});
