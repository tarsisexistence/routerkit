import { Routes } from '@angular/router';
import { ViewComponent } from '../core/components/view/view.component';

/**
 * Declares routes on App level
 * Cool stuff with routes variables
 * can be used here to add control
 * over magic strings
 */
export const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadChildren: () =>
          import('example-app/app/views/about/about.module').then(
            m => m.AboutModule
          )
      },
      {
        path: 'car',
        loadChildren: () =>
          import('example-app/app/views/car/car.module').then(m => m.CarModule)
      }
    ]
  }
];
