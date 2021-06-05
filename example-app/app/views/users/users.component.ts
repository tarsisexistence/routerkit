import { Component } from '@angular/core';
import { getRoutes } from '@routerkit/core';

import { TypedRoutes } from '../../../../example-app.routes';

@Component({
  selector: 'app-users',
  template: `
    <nav>
      <a *ngFor="let user of users" [routerLink]="routes.users[user]" [routerLinkActive]="['router-link-active']">{{
        user
      }}</a>
    </nav>
    <p>Users</p>
  `
})
export class UsersComponent {
  public routes = getRoutes<TypedRoutes>();
  public users = ['Wilhelm Röntgen', 'Henri Becquerel', 'Lord Rayleigh', 'Philipp Lenard', 'J. J. Thomson'];
}
