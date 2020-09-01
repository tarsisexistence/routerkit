import { getRoutesTypeFilePath, getTypesFileName } from './utils';

describe('[parse] utils', () => {
  describe('getTypesFileName', () => {
    test('should return declaration filename', () => {
      expect(getTypesFileName('myProject')).toBe('myProject.routes.d.ts');
    });
  });

  describe('getRoutesTypeFilePath', () => {
    test('should return path to declaration routes type', () => {
      expect(getRoutesTypeFilePath('/root/tsconfig.json', 'example')).toBe('/root/example.routes.d.ts');
    });
  });
});
