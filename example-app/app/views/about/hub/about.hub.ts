import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature } from 'routeshub';
import { AboutNotes, ABOUT_NOTES_KEY } from './about.notes';
import { aboutRoutes } from './about.routes';

export const aboutConnector = createFeature<AboutNotes>(aboutRoutes, {
  key: ABOUT_NOTES_KEY
});

@NgModule({
  imports: [RouterModule.forChild(aboutRoutes)],
  exports: [RouterModule]
})
export class AboutHub {}
