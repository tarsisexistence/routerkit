# RouterKit

<a href="https://routeshub.gitbook.io/docs"><img src="https://github.com/maktarsis/routeshub/raw/master/docs/assets/logo.png" align="right" alt=""></a>

The next-gen typed **Angular** routes

- **Typing.** Type-safe Angular routes.
- **Transparency.** Just an Angular schematic parses application and produces a type.
- **Map.** Provides the ability to look at the route map of the application.
- **Scoped.** Designed to output routes type per application.
- **Declarative DX.** An all-new Angular routes experience.
- **Tiny.** Extra small size which doesn't overload the production build.

<br/>

## What problems does it solve?

- Prevents errors, typos with route paths
- Reduces the number of magic strings
- Collects all routes into one "big picture" of the particular application

These factors ultimately affect the quality of the software.
Bonus: by getting the type of routes, we get a "big picture" of our application routes, which allows us to quickly understand how the application works for end-users.

<br/>

## What does it do?

- a script which is an Angular schematic
- parses Angular project
- finds connected routes
- generates a type of project routes
- includes type in the tsconfig
- provides API for declarative routes usage

<br/>

## What it doesn't do?

- does not add complexity to the project
- does not add boilerplate at all
- does not increase (almost) production build
- does not bind to constant use (easy to stop)

This means that you can use this library for free.

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
