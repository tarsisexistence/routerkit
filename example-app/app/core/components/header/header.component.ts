import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getRoutes } from '@routerkit/core';

import { TypedRoutes } from '../../../../../example-app.routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public routes = getRoutes<TypedRoutes>();

  constructor(private router: Router) {}

  /**
   * navigation through
   * router.navigate and forwardParams
   */
  public freshCar(): void {
    this.router.navigate(this.routes.car.engine[2019]).catch(console.error);
  }
}
