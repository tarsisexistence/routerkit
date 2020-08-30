import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'routeshub';
import { CarNotes, CAR_NOTES_KEY } from './car.notes';
import { carRoutes } from './car.routes';
import { detailsUnit } from '../../details/hub/details.hub';

export const carConnector = createFeature<CarNotes>(carRoutes, {
  nearby: { details: detailsUnit },
  key: CAR_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(carRoutes)],
  exports: [RouterModule]
})
export class CarHub {}
