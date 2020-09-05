# RouterKit

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

Typed **Angular** routes

- **Typing.** Type-safe Angular routes.
- **Transparency.** Only 1 script to run before and 1 function for use.
- **Map.** Provides the ability to look at the route map of the application.
- **Declarative DX.** An all-new Angular routes experience.

<br/>

## What problems does it solve?

- Prevents errors, typos with route paths
- Reduces the number of magic strings
- Collects all routes into one "big picture" of the particular application

These factors ultimately affect the quality of the software.
Bonus: by getting the type of routes, we get a "big picture" of our application routes, which allows us to quickly understand how the application works for end-users.

<br/>

## What does it do?

a script:
- parses Angular project
- finds connected routes
- generates a type of project routes
- includes type in the tsconfig

a function:
- returns you route tree based on your routes type

<br/>

## What it doesn't do?

- does not add complexity to the project
- does not add boilerplate at all
- does not increase (almost) production build
- does not bind to constant use (easy to stop)
- does not get the deep structure of the routes, just what you actually use

It turns out that you will use it for free.

<br/>

## Install

First, you have to install the package from npm:

```sh
npm install @routerkit/core  #  yarn add @routerkit/core
```

<br/>

## Usage

### Schematic

Run schematic to generate routes type:

```sh
ng g @routerkit/core:parse --project YOUR_PROJECT_NAME
```

### Application

Before:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'details-link',
  template: `<a [routerLink]="['profile', 'details']">Details</a>`
})
export class DetailsLinkComponent {}
```

After

```typescript
import { Component } from '@angular/core';
import { getRoutes } from '@routerkit/core';

@Component({
  selector: 'details-link',
  template: `<a [routerLink]="routes.profile.details">Details</a>`
})
export class DetailsLinkComponent {
  public routes = getRoutes<RouterKit.Routes>();
}
```
