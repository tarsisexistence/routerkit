import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { FirstChildComponent } from './first-child.component';
import { routes } from './routes';

@NgModule({
  declarations: [AdminPanelComponent, FirstChildComponent],
  imports: [
    CommonModule,
    routes
  ]
})
export class AdminPanelModule {}
