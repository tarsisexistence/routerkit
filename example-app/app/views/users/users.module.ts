import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UserComponent } from './components/user.component';
import { ProfileComponent } from './components/profile.component';
import { UsersHub } from './hub/users.hub';

@NgModule({
  imports: [CommonModule, UsersHub],
  declarations: [UsersComponent, UserComponent, ProfileComponent]
})
export class UsersModule {}
