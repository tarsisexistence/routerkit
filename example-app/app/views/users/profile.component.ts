import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  template: `
    <nav>
      <a [routerLink]="['../']">Back</a>
    </nav>
    <h2>Profile</h2>
    <p>
      {{ user | async }}
    </p>
  `
})
export class ProfileComponent {
  public user: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.user = this.route.params.pipe(map((p: Params) => p.id as string));
  }
}
