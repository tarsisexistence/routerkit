import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { HomeHub } from './hub/home.hub';

@NgModule({
  imports: [CommonModule, HomeHub],
  declarations: [HomeComponent]
})
export class HomeModule {}
