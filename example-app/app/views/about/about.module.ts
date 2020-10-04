import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about.component';
import { aboutRouting } from './about.routes';

@NgModule({
  imports: [CommonModule, aboutRouting],
  declarations: [AboutComponent]
})
export class AboutModule {}
