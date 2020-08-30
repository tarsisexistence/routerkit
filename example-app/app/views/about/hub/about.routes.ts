import { Routes } from '@angular/router';
import { AboutComponent } from '../components/about.component';

/**
 * Declares routes on AboutModule level
 */
export const aboutRoutes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];
