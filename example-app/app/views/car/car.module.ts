import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DetailsModule } from '../details/details.module';
import { CarComponent } from './components/carComponent';

const carRoutes = [
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

@NgModule({
  imports: [CommonModule, DetailsModule, RouterModule.forChild(carRoutes)],
  declarations: [CarComponent]
})
export class CarModule {}
