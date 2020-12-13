import { transform } from './transform';
import { STRING_KEYWORD } from './constants';

describe('[generation] transform', () => {
  test('should return empty routes', () => {
    expect(transform({})).toEqual({});
  });

  test('should transform single root route', () => {
    expect(
      transform({
        ROOT: {}
      })
    ).toEqual({
      ROOT: ['/']
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

  test('should transform string route name to proper output without string keyword', () => {
    const output = transform({
      string: {}
    });

    expect(output.string[1]).toBe('string');
    expect(output.string[1]).not.toBe(STRING_KEYWORD);
  });

  test('should transform not flatten routes', () => {
    expect(
      transform({
        home: {},
        ROOT: {
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

  test('should transform route with root route path', () => {
    expect(
      transform({
        home: {},
        root: {
          root: {}
        }
      })
    ).toEqual({
      home: ['/', 'home'],
      root: {
        root: ['/', 'root', 'root']
      }
    });
  });

  test('should transform not flatten routes with root', () => {
    expect(
      transform({
        home: {},
        ROOT: {
          ROOT: {},
          about: {},
          location: {}
        }
      })
    ).toEqual({
      home: ['/', 'home'],
      ROOT: ['/'],
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
        ':year': ['/', 'engine', STRING_KEYWORD]
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
        ROOT: ['/', 'engine'],
        ':year': ['/', 'engine', STRING_KEYWORD]
      }
    });
  });

  test('should transform routes', () => {
    expect(
      transform({
        home: {},
        ROOT: {
          ROOT: {},
          about: {},
          car: {},
          details: {},
          info: {},
          'engine/:year': {}
        },
        users: { ROOT: {}, ':id': {}, ':id/profile': {} }
      })
    ).toEqual({
      ROOT: ['/'],
      home: ['/', 'home'],
      about: ['/', 'about'],
      car: ['/', 'car'],
      details: ['/', 'details'],
      info: ['/', 'info'],

      engine: {
        ':year': ['/', 'engine', STRING_KEYWORD]
      },

      users: {
        ROOT: ['/', 'users'],
        ':id': {
          ROOT: ['/', 'users', STRING_KEYWORD],
          profile: ['/', 'users', STRING_KEYWORD, 'profile']
        }
      }
    });
  });

  test('should transform when route has few defined paths, root and dynamic variable', () => {
    expect(
      transform({
        home: {},
        users: { ROOT: {}, ':id/settings': {}, ':id/profile': {} },
        admin: { ROOT: {}, collaborators: {}, ':id': {} },
        pages: { ROOT: {}, 'articles/today': {}, 'articles/:date': {} }
      })
    ).toEqual({
      home: ['/', 'home'],
      users: {
        ROOT: ['/', 'users'],
        ':id': {
          profile: ['/', 'users', STRING_KEYWORD, 'profile'],
          settings: ['/', 'users', STRING_KEYWORD, 'settings']
        }
      },
      admin: {
        ROOT: ['/', 'admin'],
        collaborators: ['/', 'admin', 'collaborators'],
        ':id': ['/', 'admin', STRING_KEYWORD]
      },
      pages: {
        ROOT: ['/', 'pages'],
        articles: {
          today: ['/', 'pages', 'articles', 'today'],
          ':date': ['/', 'pages', 'articles', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            ROOT: ['/', 'engine', STRING_KEYWORD],
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            ROOT: ['/', 'engine', STRING_KEYWORD],
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
            ROOT: {},
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
            ROOT: {},
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
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
          ROOT: ['/', 'engine'],
          ':year': {
            car: {
              ':type': {
                ROOT: ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD],
                model: {
                  ':id': ['/', 'engine', STRING_KEYWORD, 'car', STRING_KEYWORD, 'model', STRING_KEYWORD]
                }
              }
            }
          }
        }
      });
    });
  });
});
