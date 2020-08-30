import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { FirstChildComponent } from './first-child.component';
import { SecondChildComponent } from './second-child.component';

@NgModule({
  declarations: [MainPageComponent, FirstChildComponent, SecondChildComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        children: [
          {
            path: '',
            component: FirstChildComponent
          },
          {
            path: 'second-child',
            component: SecondChildComponent
          },
          {
            path: 'third-child-module',
            loadChildren: () =>
              import('./third-lazy-child/third-lazy-child.module').then(
                m => m.ThirdLazyChildModule
              )
          }
        ]
      },
      {
        path: 'licenses',
        loadChildren: () =>
          import('./licences/licences.module').then(m => m.LicencesModule)
      },
      {
        path: 'redirect-to-root',
        redirectTo: ''
      }
    ]),
    CommonModule
  ]
})
export class DashboardModule {}
