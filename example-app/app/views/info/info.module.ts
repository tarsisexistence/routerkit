import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './info.component';

const infoRoutes: Routes = [
  {
    path: 'info',
    component: InfoComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(infoRoutes)],
  declarations: [InfoComponent]
})
export class InfoModule {}
