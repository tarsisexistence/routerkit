# 0.8.1 2020-10-04

- Fixed angular interpolation toString call
- Fixed case when parser does not produce all application routes

# 0.8.0 2020-10-03

Crucial release

- Improved parser script (~75% faster for large projects)
- Fixed issue with circular dependencies for `nx workspaces` (will generate a file in `rootDir`)
- Fixed issue with accessing empty path route
- Fixed issue with accessing property similar to array index
- Fixed issue with internal developer experience (debugging schematics) 
- Renamed empty path route (was `root`, now `ROOT`)
- Updated usage example in documentation
- Updated dependencies

# 0.7.2 2020-09-22

- Fixed nx typescript "paths"

# 0.7.0 2020-09-20

- Introduced new ng-add schematic
- Updated contributors
- Updated dependencies
- Added project contributors docs section

# 0.6.0 2020-09-13

- Added support of "length" proxy property
- Added support of callable Array.prototype properties
- Fixed not exported TypedRoute
- Not updated documentation for the first time 😄

# 0.5.0 2020-09-13

- Added support for toString()
- Updated API for proxy (now available properties "asArray" and "asString" to get pure value from the prototypes)
- Updated documentation

# 0.4.0 2020-09-12

- Changed generated routes type name (was "RouterKitTypes, became "TypedRoutes")
- Changed generated routes type keyword (was "declare", became "export")
- Paused tsconfig.json update (now needed manual import of the routes type)
- Renamed API (was "getRoute", became "getPaths")
- Updated documentation

# 0.3.1 2020-09-12

- Updated dependencies
- Updated documentation

# 0.3.0 2020-09-07

- Added variable and enum paths support
- Reduced api size
- Rewritten documentation (again 😅)

# 0.2.0 2020-09-06

- Fixed few parse edge cases
- Updated core dependencies
- Rewritten documentation

# 0.1.2 2020-09-02

Initial release

- Parsing particular angular project
- Generating typescript type of project routes
- Dry run option
- Type usage API
- Support typescript paths
