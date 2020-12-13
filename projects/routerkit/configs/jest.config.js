module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/../tsconfig.test.json`
    }
  },
  moduleNameMapper: {
    '^lib$': `${__dirname}/../package/index`,
    '^lib(.*)': `${__dirname}/../package/src/$1`
  },
  modulePathIgnorePatterns: [
    '<rootDir>/projects/shared',
    '<rootDir>/projects/parser',
  ]
};

/**
 * ISSUE: IN CASE YOU USE INTELLIJ IDE
 * https://github.com/just-jeb/angular-builders/issues/203
 *
 * Basically, Intellij IDE product makes a false assumption about the root
 * folder, and therefore, in order to configure manual launch from IDE,
 * you must do the following steps:
 *
 * 1. Run
 * 2. Edit configurations...
 * 3. Templates
 * 4. Jest
 * 5. Fill working directory with root of routerkit repository
 *
 * Don't forget to remove previous test configurations
 * so that all tests run from a single base template
 */
