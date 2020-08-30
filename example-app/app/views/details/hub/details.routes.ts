import { Routes } from '@angular/router';
import { DetailsComponent } from '../components/details.component';

export const detailsRoutes: Routes = [
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'info',
    loadChildren: () =>
      import('example-app/app/views/info/info.module').then(m => m.InfoModule)
  }
];
