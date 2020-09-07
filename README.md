# RouterKit

<a href="https://routeshub.gitbook.io/docs"><img src="https://raw.githubusercontent.com/retarsis/routerkit/master/assets/logo.png" align="right" alt="logo" /></a>

A new approach to Angular routes:

- **Type-safe:** Auto-completion and type checking for @angular/router routes.
- **Easy setup:** Only 1 script to run before and 1 function for use.
- **Concise** `[routerLink]="routes.one.two.three"` instead of `[routerLink]="['one','two','three']"`
- **Versatile**. Supports modern and old fashion lazy routes syntax, and certainly eager routes.
- **Tiny** ~0.2kb. All the magic happens on the type level, runtime API is only one small function.

<br/>

## Showcase

<img src="https://raw.githubusercontent.com/retarsis/routerkit/master/assets/concise.gif" alt="Gif demonstrating the process of running schematic script." align="center">

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
- traverses generated AST, extracting route information and following eager / lazy routes
- gets all connected routes to the projected
- generates a TypeScript `type` containing all your routes information.
- includes the generated type in your `tsconfig`

[function](https://github.com/retarsis/routerkit/blob/1e9e55c8e66b44a1ac1d841a0f5aacc3d28b2989/package/src/core/getRoutes.ts#L1):

- returns route paths based on your routes type with appropriate JavaScript object structure

<br/>

## Install

Install the package from [npm](https://www.npmjs.com/):

```sh
npm install @routerkit/core  #  yarn add @routerkit/core
```

<br/>

## Usage

### Schematic

You can run [Angular schematic](https://cli.angular.io/) to generate the routes type:

```sh
ng g @routerkit/core:parse --project YOUR_PROJECT_NAME
```

### App

Before:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'user-details-link',
  template: `<a [routerLink]="['profile', 'users', userId]">User Details</a>`
})
export class UserComponent {}
```

After:

```typescript
import { Component } from '@angular/core';
import { getRoutes } from '@routerkit/core';

@Component({
  selector: 'user-details-link',
  template: `<a [routerLink]="routes.profile.users[userId]">User Details</a>`
})
export class UserComponent {
  public routes = getRoutes<RouterKit.Routes>();
}
```
