import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  template: `
    <nav>
      <a [routerLink]="['../']">Back</a>
      <a [routerLink]="['profile']">Profile</a>
    </nav>
    <h2>User</h2>
    <p>
      {{ user | async }}
    </p>
  `
})
export class UserComponent {
  public user: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.user = this.route.params.pipe(map((p: Params) => p.id as string));
  }
}
