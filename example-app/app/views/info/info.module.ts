import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './components/info.component';
import { InfoHub } from './hub/info.hub';

@NgModule({
  imports: [CommonModule, InfoHub],
  declarations: [InfoComponent]
})
export class InfoModule {}
