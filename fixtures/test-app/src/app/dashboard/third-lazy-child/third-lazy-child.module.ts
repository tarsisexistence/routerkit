import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponentComponent } from './root-component.component';
import { Route, RouterModule } from '@angular/router';
import { EagerComponent } from './eager.component';

const eagerRoute: Route = { path: 'eager', component: EagerComponent };

@NgModule({
  declarations: [RootComponentComponent, EagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RootComponentComponent },
      eagerRoute
    ])
  ]
})
export class ThirdLazyChildModule { }
