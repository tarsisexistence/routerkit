import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <p>
      Home
    </p>
    <nav>
      <a [routerLink]="['../']">Back</a>
    </nav>
  `
})
export class HomeComponent {}
