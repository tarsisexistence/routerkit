# RouterKit

<a href="https://routeshub.gitbook.io/docs"><img src="https://raw.githubusercontent.com/tarsinzer/routerkit/master/assets/logo.png" align="right" alt="logo" /></a>

A new approach to Angular routes:

- **Type-safe.** Auto-completion and type checking for @angular/router routes.
- **Easy setup.** Only 1 script to run before and 2 functions for use.
- **Concise.** `[routerLink]="routes.one.two.three"` instead of `[routerLink]="['one','two','three']"`
- **Versatile.** Supports modern and old fashion lazy routes syntax, and certainly eager routes.
- **Tiny.** ~0.4kb. All the magic happens on the type level, runtime API is only one small function.

<br/>

## Showcase

<img src="https://raw.githubusercontent.com/tarsinzer/routerkit/master/assets/concise.gif" alt="Gif demonstrating the process of running schematic script." align="center">

<br/>

## What problems does it solve?

- Prevents errors, typos, mistakes with route paths
- Reduces the number of magic strings
- Collects all routes into one "big picture" of the particular angular project

<br/>

## How does it work?

[script](https://github.com/tarsinzer/routerkit/blob/master/package/src/parse/index.ts):

- parses your Angular project
- traverses generated AST, extracting route information and following eager / lazy routes
- gets all connected routes to the projected
- generates a TypeScript `type` containing all your routes information.
- includes the generated type in your `tsconfig`

[function](https://github.com/tarsinzer/routerkit/blob/master/package/src/core/getRoutes.ts):

- returns route paths based on your routes type with appropriate JavaScript object structure

<br/>

## Install

Install the package via [Angular schematic](https://angular.io/guide/schematics-for-libraries):

```sh
ng add @routerkit/core
```

<br/>

## Usage

### Schematic

You can run [Angular schematic](https://angular.io/guide/schematics) to generate the routes type:

```sh
ng g @routerkit/core:parse --project YOUR_PROJECT_NAME
```

### App

**Before:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'user-details-link',
  template: `<a routerLink="/profile/users/{{ usersId }}">User Details</a>`
})
export class UserComponent {
  usersId = 42;
}
```

**After:**

```typescript
import { Component } from '@angular/core';

import { getRoutes } from '@routerkit/core';
import { TypedRoutes } from '{ROOT}/{PROJECT_NAME}.routes.d.ts';

@Component({
  selector: 'user-details-link',
  template: `<a routerLink="{{ routes.profile.users[usersId] }}">User Details</a>`
})
export class UserComponent {
  routes: TypedRoutes = getRoutes<TypedRoutes>();
  usersId = 42;
}
```

<br/>

_Tip: if you prefer [routerLink] directive you can use `asArray` (asString is available too) property_

**Before:**

```html
<a [routerLink]="['/', 'profile', 'users', userId]">Navigate</a>
```

**After:**

```html
<a [routerLink]="routes.profile.users[userId].asArray">Navigate</a>
```

<br/>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/tarsinzer"><img src="https://avatars1.githubusercontent.com/u/21989873?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Max Tarsis</b></sub></a><br /><a href="#ideas-tarsinzer" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/tarsinzer/routerkit/commits?author=tarsinzer" title="Code">💻</a> <a href="#infra-tarsinzer" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/tarsinzer/routerkit/commits?author=tarsinzer" title="Documentation">📖</a> <a href="#projectManagement-tarsinzer" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/limitofzero"><img src="https://avatars1.githubusercontent.com/u/16196664?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Denis Makarov</b></sub></a><br /><a href="#ideas-limitofzero" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/tarsinzer/routerkit/commits?author=limitofzero" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/kirjs"><img src="https://avatars0.githubusercontent.com/u/2545357?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kirill Cherkashin</b></sub></a><br /><a href="#ideas-kirjs" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/tarsinzer/routerkit/commits?author=kirjs" title="Documentation">📖</a></td>
    <td align="center"><a href="https://thekiba.io/"><img src="https://avatars0.githubusercontent.com/u/1910515?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew Grekov</b></sub></a><br /><a href="#ideas-thekiba" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://indepth.dev/author/layzee/"><img src="https://avatars1.githubusercontent.com/u/6364586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lars Gyrup Brink Nielsen</b></sub></a><br /><a href="https://github.com/tarsinzer/routerkit/commits?author=LayZeeDK" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/JoepKockelkorn"><img src="https://avatars3.githubusercontent.com/u/12891645?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Joep Kockelkorn</b></sub></a><br /><a href="https://github.com/tarsinzer/routerkit/issues?q=author%3AJoepKockelkorn" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/Andrei0872"><img src="https://avatars2.githubusercontent.com/u/36248290?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Gatej Andrei</b></sub></a><br /><a href="https://github.com/tarsinzer/routerkit/commits?author=Andrei0872" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
