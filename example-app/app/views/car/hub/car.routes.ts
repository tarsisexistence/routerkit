import { CarComponent } from '../components/carComponent';

export const carRoutes = [
  {
    path: '',
    pathMatch: 'full',
    component: CarComponent
  },
  {
    path: 'engine/:year',
    pathMatch: 'full',
    component: CarComponent
  }
];
