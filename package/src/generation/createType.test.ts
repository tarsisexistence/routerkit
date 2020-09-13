import {
  createIndexTypeNode,
  createIntersectionTypeNode,
  createTupleTypeNode,
  createType,
  createTypeNode,
  createTypeNodeWithIndex,
  createTypeReferenceNodeOfTuple,
  createTypeTree
} from './createType';

describe('[generation] createType', () => {
  describe('createType', () => {
    test('should match snapshot', () => {
      expect(createType({ home: ['/', 'home'] })).toMatchSnapshot();
    });
  });

  describe('createTypeTree', () => {
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

  describe('createTypeNode', () => {
    test('should match empty routes', () => {
      expect(createTypeNode({})).toMatchSnapshot();
    });

    test('should match regular routes', () => {
      expect(
        createTypeNode({
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
        createTypeNode({
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
        createTypeNode({
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

  describe('createTypeNodeWithIndex', () => {
    test('should match IntersectionTypeNode', () => {
      expect(
        createTypeNodeWithIndex({
          info: ['/', 'info'],
          ':city': ['/', 'string']
        })
      ).toMatchSnapshot();
    });

    test('should match only index type inside of type TypeLiteralNode', () => {
      expect(
        createTypeNodeWithIndex({
          ':city': ['/', 'string']
        })
      ).toMatchSnapshot();
    });
  });

  describe('createIntersectionTypeNode', () => {
    test('should match IntersectionTypeNode', () => {
      expect(
        createIntersectionTypeNode(
          {
            info: ['/', 'info']
          },
          { name: 'city', value: ['/', 'string'] }
        )
      ).toMatchSnapshot();
    });

    test('should match IntersectionTypeNode with empty TypeLiteralNode of routes without variable and index type of TypeLiteralNode', () => {
      // {} & { [city: string]: ['/', 'string'] }
      expect(createIntersectionTypeNode({}, { name: 'city', value: ['/', 'string'] })).toMatchSnapshot();
    });
  });

  describe('createIndexTypeNode', () => {
    test('should match indexType of tuple', () => {
      expect(createIndexTypeNode({ name: 'city', value: ['/', 'string'] })).toMatchSnapshot();
    });

    test('should match indexType of typeNodes', () => {
      expect(
        createIndexTypeNode({
          name: 'city',
          value: {
            street: ['/', 'string', 'street']
          }
        })
      ).toMatchSnapshot();
    });
  });

  describe('createTupleTypeNode', () => {
    test('should match empty tuple', () => {
      expect(createTupleTypeNode([])).toMatchSnapshot();
    });

    test('should match regular tuple', () => {
      expect(createTupleTypeNode(['/', 'location', 'map', 'general'])).toMatchSnapshot();
    });

    test('should match tuple with string keyword', () => {
      expect(createTupleTypeNode(['/', 'location', 'map', 'string'])).toMatchSnapshot();
    });
  });

  describe('createTypeReferenceNodeOfTuple', () => {
    test('should match snapshot of empty tuple', () => {
      expect(createTypeReferenceNodeOfTuple([])).toMatchSnapshot();
    });

    test('should match snapshot with tuple of regular tuple', () => {
      expect(createTypeReferenceNodeOfTuple(['/', 'location', 'map', 'general'])).toMatchSnapshot();
    });

    test('should match snapshot with tuple with string keyword', () => {
      expect(createTypeReferenceNodeOfTuple(['/', 'location', 'map', 'string'])).toMatchSnapshot();
    });
  });
});
