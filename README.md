# RouterKit

<a href="https://routeshub.gitbook.io/docs"><img src="https://raw.githubusercontent.com/retarsis/routerkit/master/assets/logo.png" align="right" alt="logo" /></a>

New approach to Angular routes:

- **Type-safe:** Get auto-completion and type checking for @angular/router routes. Works with Lazy routes! 
- **Easy to setup:** Only 1 script to run before and 1 function for use
- **Consice** `routerLink="routes.a.b.c"` instead of `routerLink="['a','b','c']"`

<br/>

## Showcase

<img src="https://raw.githubusercontent.com/retarsis/routerkit/master/assets/medium-short.gif" alt="Gif demostrating the process of installing the package." align="center" alt="showcase gif">

<br/>

## What problems does it solve?

- Prevents errors, typos with route paths
- Reduces the number of magic strings
- Collects all routes into one "big picture" of the particular application

These factors ultimately affect the quality of the software.
Bonus: by getting the type of routes, we get a "big picture" of our application routes, which allows us to quickly understand how the application works for end-users.

<br/>

## How does it work?

[script](https://github.com/retarsis/routerkit/blob/master/package/src/parse/index.ts):
- parses your Angular project
- traverses generated AST, extracting route information and following lazy routes
- generates generates a TypeScript `type` (see example )containing all your routing information.
- includes the generated type in your `tsconfig.json`

[function](https://github.com/retarsis/routerkit/blob/1e9e55c8e66b44a1ac1d841a0f5aacc3d28b2989/package/src/core/getRoutes.ts#L1):
- returns you route tree based on your routes type with appropriate JavaScript object structure

<br/>

## Install

Install the package from [npm](https://www.npmjs.com/):

```sh
npm install @routerkit/core  #  yarn add @routerkit/core
```

<br/>

## Usage

### Schematic

If you use [@angular/cli](https://cli.angular.io/), you can run schematic to generate the routes type:

```sh
ng g @routerkit/core:parse --project YOUR_PROJECT_NAME
```

### Application

Before:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'details-link',
  template: `<a [routerLink]="['profile', 'users', userId]">Details</a>`
})
export class DetailsLinkComponent {}
```

After:

```typescript
import { Component } from '@angular/core';
import { getRoutes } from '@routerkit/core';

@Component({
  selector: 'details-link',
  template: `<a [routerLink]="routes.profile.users[userId]">Details</a>`
})
export class DetailsLinkComponent {
  public routes = getRoutes<RouterKit.Routes>();
}
```
