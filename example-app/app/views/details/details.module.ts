import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';
import { detailsRoutes } from './details.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(detailsRoutes)],
  declarations: [DetailsComponent]
})
export class DetailsModule {}
