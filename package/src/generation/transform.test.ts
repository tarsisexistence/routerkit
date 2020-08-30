import { transform } from './transform';

describe('[generation] transform', () => {
  test('should return empty routes', () => {
    expect(transform({})).toEqual({});
  });

  test('should transform single root route', () => {
    expect(
      transform({
        root: {}
      })
    ).toEqual({
      root: ['/']
    });
  });

  test('should transform single route', () => {
    expect(
      transform({
        home: {}
      })
    ).toEqual({
      home: ['/', 'home']
    });
  });

  test('should transform not flatten routes', () => {
    expect(
      transform({
        home: {},
        root: {
          about: {},
          location: {}
        }
      })
    ).toEqual({
      home: ['/', 'home'],
      about: ['/', 'about'],
      location: ['/', 'location']
    });
  });

  test('should transform not flatten routes with root', () => {
    expect(
      transform({
        home: {},
        root: {
          root: {},
          about: {},
          location: {}
        }
      })
    ).toEqual({
      home: ['/', 'home'],
      root: ['/'],
      about: ['/', 'about'],
      location: ['/', 'location']
    });
  });

  test('should transform multipath routes', () => {
    expect(
      transform({
        home: {},
        'engine/:year': {}
      })
    ).toEqual({
      home: ['/', 'home'],
      engine: {
        ':year': ['/', 'engine', 'string']
      }
    });
  });

  test('should transform multipath routes when there is duplicated semipath', () => {
    expect(
      transform({
        home: {},
        engine: {},
        'engine/:year': {}
      })
    ).toEqual({
      home: ['/', 'home'],
      engine: {
        root: ['/', 'engine'],
        ':year': ['/', 'engine', 'string']
      }
    });
  });

  test('should transform routes', () => {
    expect(
      transform({
        home: {},
        root: {
          root: {},
          about: {},
          car: {},
          details: {},
          info: {},
          'engine/:year': {}
        },
        users: { root: {}, ':id': {}, ':id/profile': {} }
      })
    ).toEqual({
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
    });
  });

  test('should transform when route has few defined paths, root and dynamic variable', () => {
    expect(
      transform({
        home: {},
        users: { root: {}, ':id/settings': {}, ':id/profile': {} },
        admin: { root: {}, collaborators: {}, ':id': {} },
        pages: { root: {}, 'articles/today': {}, 'articles/:date': {} }
      })
    ).toEqual({
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
    });
  });

  describe('when multipaths comparison', () => {
    test('should transform multipaths by asc', () => {
      expect(
        transform({
          home: {},
          engine: {},
          'engine/:year': {},
          'engine/:year/car/:type': {},
          'engine/:year/car/:type/model/:id': {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            root: ['/', 'engine', 'string'],
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform multipaths by desc', () => {
      expect(
        transform({
          home: {},
          'engine/:year/car/:type/model/:id': {},
          'engine/:year/car/:type': {},
          'engine/:year': {},
          engine: {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            root: ['/', 'engine', 'string'],
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform nested multipaths by asc', () => {
      expect(
        transform({
          home: {},
          engine: {
            root: {},
            ':year': {
              car: {
                ':type': {}
              }
            }
          },
          'engine/:year/car/:type/model/:id': {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform nested multipaths by desc', () => {
      expect(
        transform({
          home: {},
          'engine/:year/car/:type/model/:id': {},
          engine: {
            root: {},
            ':year': {
              car: {
                ':type': {}
              }
            }
          }
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });
  });

  describe('when deep comparison', () => {
    test('should transform deep routes by asc', () => {
      expect(
        transform({
          home: {},
          engine: {},
          'engine/:year': {
            'car/:type': {}
          },
          'engine/:year/car/:type/model/:id': {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform deep routes by desc', () => {
      expect(
        transform({
          home: {},
          'engine/:year/car/:type/model/:id': {},
          'engine/:year': {
            'car/:type': {}
          },
          engine: {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform destructured deep routes by asc', () => {
      expect(
        transform({
          home: {},
          engine: {},
          'engine/:year': {
            car: {
              ':type': {}
            }
          },
          'engine/:year/car/:type/model/:id': {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });

    test('should transform destructured deep routes by desc', () => {
      expect(
        transform({
          home: {},
          'engine/:year/car/:type/model/:id': {},
          'engine/:year': {
            car: {
              ':type': {}
            }
          },
          engine: {}
        })
      ).toEqual({
        home: ['/', 'home'],
        engine: {
          root: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                root: ['/', 'engine', 'string', 'car', 'string'],
                model: {
                  ':id': [
                    '/',
                    'engine',
                    'string',
                    'car',
                    'string',
                    'model',
                    'string'
                  ]
                }
              }
            }
          }
        }
      });
    });
  });
});
