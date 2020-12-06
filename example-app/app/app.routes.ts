import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './core/components/view/view.component';

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
        loadChildren: () => import('example-app/app/views/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'car',
        loadChildren: () => import('example-app/app/views/car/car.module').then(m => m.CarModule)
      }
    ]
  }
];

export const appRouting = RouterModule.forRoot(routes, {
    enableTracing: false,
    initialNavigation: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'top',
    relativeLinkResolution: 'legacy'
});
