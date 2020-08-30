import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsComponent } from './components/details.component';
import { DetailsHub } from './hub/details.hub';

@NgModule({
  declarations: [DetailsComponent],
  imports: [CommonModule, DetailsHub]
})
export class DetailsModule {}
