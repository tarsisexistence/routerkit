import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { FirstChildComponent } from './first-child.component';

export const routes = RouterModule.forChild([{
    path: '',
    component: AdminPanelComponent,
    children: [
      { path: '', component: FirstChildComponent }
    ]
}]);
