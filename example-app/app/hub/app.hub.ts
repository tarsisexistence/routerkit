// tslint:disable:max-line-length
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { connectFeatures, createRoot, NavigationModule } from 'routeshub';

import { routes } from './app.routes';
import { AppChildNotes, AppNotes, APP_NOTES_KEY } from './app.notes';
import { aboutConnector } from '../views/about/hub/about.hub';
import { carConnector } from '../views/car/hub/car.hub';
import { homeConnector } from '../views/home/hub/home.hub';
import { usersConnector } from '../views/users/hub/users.hub';
import { AboutNotes } from '../views/about/hub/about.notes';
import { CarNotes } from '../views/car/hub/car.notes';
import { DetailsNotes } from '../views/details/hub/details.notes';
import { HomeNotes } from '../views/home/hub/home.notes';
import { InfoNotes } from '../views/info/hub/info.notes';
import { UsersChildNotes, UsersNotes } from '../views/users/hub/users.notes';

/**
 * Creates stateful named App routes
 */
createRoot<AppNotes, AppChildNotes>(routes, {
  key: APP_NOTES_KEY,
  nearby: {
    home: homeConnector,
    users: usersConnector
  }
});

/**
 * connects features which have attached relation
 * for this module
 *
 * {
 *  path: 'about'
 *  loadChildren: () => import('example-app/app/views/about/about.module').then(m => m.AboutModule)
 * }
 */
connectFeatures<AppNotes, AppChildNotes>(APP_NOTES_KEY, {
  about: aboutConnector,
  car: carConnector
});

/**
 * Describes the project's hubs
 */
export interface Hub {
  app: AppNotes & AppChildNotes;
  about: AboutNotes;
  car: CarNotes;
  details: DetailsNotes;
  home: HomeNotes;
  info: InfoNotes;
  users: UsersNotes & UsersChildNotes;
}

/**
 * Routing configuration
 */
export const routing: ModuleWithProviders<AppHub> = RouterModule.forRoot(
  routes,
  {
    enableTracing: false,
    initialNavigation: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top'
  }
);

/**
 * Routing module contains its configuration
 * and providers (resolvers, guard, interceptors etc)
 * and also exports RouterModule
 */
@NgModule({
  imports: [routing],
  exports: [RouterModule, NavigationModule]
})
export class AppHub {}
