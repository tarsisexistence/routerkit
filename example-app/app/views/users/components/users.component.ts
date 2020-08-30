import { Component, OnInit } from '@angular/core';
import { getUnit } from 'routeshub';
import { USERS_NOTES_KEY } from '../hub/users.notes';

@Component({
  selector: 'app-users',
  template: `
    <nav>
      <a
        *ngFor="let user of users"
        [navLink]="usersUnit.id"
        [navParams]="{ id: user }"
        [routerLinkActive]="['router-link-active']"
        >{{ user }}</a
      >
    </nav>
    <p>
      Users
    </p>
  `
})
export class UsersComponent implements OnInit {
  public usersUnit = getUnit(USERS_NOTES_KEY);
  public users: string[];

  public ngOnInit(): void {
    this.users = [
      'Wilhelm Röntgen',
      'Henri Becquerel',
      'Lord Rayleigh',
      'Philipp Lenard',
      'J. J. Thomson'
    ];
  }
}
