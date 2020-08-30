import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'routeshub';
import { InfoNotes, INFO_NOTES_KEY } from './info.notes';
import { infoRoutes } from './info.routes';

export const infoConnector = createFeature<InfoNotes>(infoRoutes, {
  key: INFO_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(infoRoutes)],
  exports: [RouterModule]
})
export class InfoHub {}
