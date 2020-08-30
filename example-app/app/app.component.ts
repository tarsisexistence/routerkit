import { Component } from '@angular/core';

/**
 * Our main AppComponent to bootstrap application
 * and outlet our router configurations
 */
@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
