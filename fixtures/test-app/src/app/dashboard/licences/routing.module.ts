import { NgModule } from '@angular/core';
import * as Router from '@angular/router';
import { routes } from './routes';

@NgModule({
  exports: [
    Router.RouterModule
  ],
  declarations: [],
  imports: [
    Router.RouterModule.forChild(routes)
  ]
})
export class RoutingModule { }
