import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createFeature, NavigationModule } from 'routeshub';
import { UsersChildNotes, UsersNotes, USERS_NOTES_KEY } from './users.notes';
import { usersRoutes } from './users.routes';

export const usersConnector = createFeature<UsersNotes, UsersChildNotes>(
  usersRoutes,
  { key: USERS_NOTES_KEY }
);

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule, NavigationModule]
})
export class UsersHub {}
