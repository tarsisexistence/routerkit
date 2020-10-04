import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile.component';
import {RouterModule} from "@angular/router";
import {usersRoutes} from "./users.routes";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes)],
  declarations: [UsersComponent, UserComponent, ProfileComponent]
})
export class UsersModule {}
