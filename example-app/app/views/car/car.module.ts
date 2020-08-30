import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsModule } from '../details/details.module';
import { CarComponent } from './components/carComponent';
import { CarHub } from './hub/car.hub';

@NgModule({
  declarations: [CarComponent],
  imports: [CommonModule, DetailsModule, CarHub]
})
export class CarModule {}
