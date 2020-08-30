import { UsersComponent } from '../components/users.component';
import { UserComponent } from '../components/user.component';
import { ProfileComponent } from '../components/profile.component';

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
