import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { FirstChildComponent } from './first-child.component';
import { paths } from './paths';
import { SecondChildComponent } from './second-child.component';
import { PathsEnum } from './paths.enum';
import { ThirdChildComponent } from './third-child.component';

const pathValue = '';

export const routes = RouterModule.forChild([
  {
    path: pathValue,
    component: AdminPanelComponent,
    children: [
      { path: paths.firstChildPath, component: FirstChildComponent },
      { path: paths.secondChildPath, component: SecondChildComponent },
      { path: PathsEnum.third, component: ThirdChildComponent }
    ]
  }
]);
