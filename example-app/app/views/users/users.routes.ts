import { UsersComponent } from './users.component';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile.component';

export const usersRoutes = [
  {
    path: 'users',
    children: [
      { path: '', component: UsersComponent },
      { path: ':id', component: UserComponent },
      { path: ':id/profile', component: ProfileComponent }
    ]
  }
];
