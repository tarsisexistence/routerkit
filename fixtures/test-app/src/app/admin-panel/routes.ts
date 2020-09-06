import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { FirstChildComponent } from './first-child.component';

const pathValue = '';

export const routes = RouterModule.forChild([
  {
    path: pathValue,
    component: AdminPanelComponent,
    children: [{ path: '', component: FirstChildComponent }]
  }
]);
