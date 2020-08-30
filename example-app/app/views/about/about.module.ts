import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about.component';
import { AboutHub } from './hub/about.hub';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutHub]
})
export class AboutModule {}
