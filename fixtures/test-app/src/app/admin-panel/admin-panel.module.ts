import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { FirstChildComponent } from './first-child.component';
import { routes } from './routes';
import { SecondChildComponent } from './second-child.component';

@NgModule({
  declarations: [AdminPanelComponent, FirstChildComponent, SecondChildComponent],
  imports: [CommonModule, routes]
})
export class AdminPanelModule {}
