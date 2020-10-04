import { mergeRouteTrees } from './merge-route-trees';

describe('merge trees test', () => {
  test('should return expected tree 1', () => {
    const left: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {
          test1: {}
        }
      }
    };

    const right: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {}
      }
    };

    expect(mergeRouteTrees(left, right)).toEqual(left);
  });

  test('should return expected tree 2', () => {
    const left: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {
          test1: {}
        }
      }
    };

    const right: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {}
      }
    };

    expect(mergeRouteTrees(right, left)).toEqual(left);
  });

  test('should return expected tree 3', () => {
    const left: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {
          test1: {}
        }
      }
    };

    const right: RouterKit.Parse.RouteTree = {
      ROOT2: {
        test: {
          test1: {}
        }
      }
    };

    const expectedTree = {
      ROOT: {
        test: {
          test1: {}
        }
      },
      ROOT2: {
        test: {
          test1: {}
        }
      }
    };

    expect(mergeRouteTrees(left, right)).toEqual(expectedTree);
  });

  test('should return expected tree 4', () => {
    const left: RouterKit.Parse.RouteTree = {
      ROOT: {
        test: {
          test1: {}
        }
      },
      ROOT2: {
        deepProp: {
          deepProp2: {}
        }
      }
    };

    const right: RouterKit.Parse.RouteTree = {
      ROOT2: {
        test: {
          test1: {}
        }
      }
    };

    const expectedTree = {
      ROOT: {
        test: {
          test1: {}
        }
      },
      ROOT2: {
        test: {
          test1: {}
        },
        deepProp: {
          deepProp2: {}
        }
      }
    };

    expect(mergeRouteTrees(left, right)).toEqual(expectedTree);
  });
});
