import {
  createIndexType,
  createIntersectionType,
  createTupleType,
  createType,
  createTypeTree,
  createTypeWithIndex
} from './createTypeTree';

describe('[generation] createTypeTree', () => {
  describe('createTypeTree', () => {
    test('should match for empty routes', () => {
      expect(createTypeTree({})).toMatchSnapshot();
    });

    test('should match for routes with intersection in front', () => {
      // type Routes = { root: ['/'] } & { [city: string]: ['/', string] };
      expect(
        createTypeTree({
          root: ['/'],
          ':city': ['/', 'string']
        })
      ).toMatchSnapshot();
    });

    test('should match for example routes', () => {
      expect(
        createTypeTree({
          root: ['/'],
          home: ['/', 'home'],
          about: ['/', 'about'],
          car: ['/', 'car'],
          details: ['/', 'details'],
          info: ['/', 'info'],

          engine: {
            ':year': ['/', 'engine', 'string']
          },

          users: {
            root: ['/', 'users'],
            ':id': {
              root: ['/', 'users', 'string'],
              profile: ['/', 'users', 'string', 'profile']
            }
          }
        })
      ).toMatchSnapshot();
    });

    test('should match for more difficult example routes', () => {
      expect(
        createTypeTree({
          home: ['/', 'home'],
          users: {
            root: ['/', 'users'],
            ':id': {
              profile: ['/', 'users', 'string', 'profile'],
              settings: ['/', 'users', 'string', 'settings']
            }
          },
          admin: {
            root: ['/', 'admin'],
            collaborators: ['/', 'admin', 'collaborators'],
            ':id': ['/', 'admin', 'string']
          },
          pages: {
            root: ['/', 'pages'],
            articles: {
              today: ['/', 'pages', 'articles', 'today'],
              ':date': ['/', 'pages', 'articles', 'string']
            }
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('createType', () => {
    test('should match empty routes', () => {
      expect(createType({})).toMatchSnapshot();
    });

    test('should match regular routes', () => {
      expect(
        createType({
          root: ['/'],
          home: ['/', 'home'],
          about: ['/', 'about'],
          car: ['/', 'car'],
          details: ['/', 'details'],
          info: ['/', 'info']
        })
      ).toMatchSnapshot();
    });

    test('should match nested regular routes', () => {
      expect(
        createType({
          root: ['/'],
          home: {
            place: ['/', 'home', 'place']
          },
          about: {
            story: {
              company: ['/', 'about', 'story', 'company'],
              team: ['/', 'about', 'story', 'team']
            }
          },
          location: {
            map: {
              city: {
                street: ['/', 'location', 'map', 'city', 'street']
              }
            }
          }
        })
      ).toMatchSnapshot();
    });

    test('should match routes with children intersection', () => {
      expect(
        createType({
          root: ['/'],
          home: {
            ':place': ['/', 'home', 'string']
          },
          about: {
            story: {
              company: ['/', 'about', 'story', 'company'],
              team: ['/', 'about', 'story', 'team']
            }
          },
          location: {
            map: {
              ':city': {
                info: ['/', 'location', 'map', 'string', 'info'],
                ':street': ['/', 'location', 'map', 'string', 'string']
              }
            }
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('createTypeWithIndex', () => {
    test('should match IntersectionTypeNode', () => {
      expect(
        createTypeWithIndex({
          info: ['/', 'info'],
          ':city': ['/', 'string']
        })
      ).toMatchSnapshot();
    });

    test('should match only index type inside of type TypeLiteralNode', () => {
      expect(
        createTypeWithIndex({
          ':city': ['/', 'string']
        })
      ).toMatchSnapshot();
    });
  });

  describe('createIntersectionType', () => {
    test('should match IntersectionTypeNode', () => {
      expect(
        createIntersectionType(
          {
            info: ['/', 'info']
          },
          { name: 'city', value: ['/', 'string'] }
        )
      ).toMatchSnapshot();
    });

    test('should match IntersectionTypeNode with empty TypeLiteralNode of routes without variable and index type of TypeLiteralNode', () => {
      // {} & { [city: string]: ['/', 'string'] }
      expect(createIntersectionType({}, { name: 'city', value: ['/', 'string'] })).toMatchSnapshot();
    });
  });

  describe('createIndexType', () => {
    test('should match indexType of tuple', () => {
      expect(createIndexType({ name: 'city', value: ['/', 'string'] })).toMatchSnapshot();
    });

    test('should match indexType of typeNodes', () => {
      expect(
        createIndexType({
          name: 'city',
          value: {
            street: ['/', 'string', 'street']
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('createTupleType', () => {
    test('should match empty tuple', () => {
      expect(createTupleType([])).toMatchSnapshot();
    });

    test('should match regular tuple', () => {
      expect(createTupleType(['/', 'location', 'map', 'general'])).toMatchSnapshot();
    });

    test('should match tuple with string keywords', () => {
      expect(createTupleType(['/', 'location', 'map', 'string'])).toMatchSnapshot();
    });
  });
});
