import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpComponent } from './help.component';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent, HelpComponent],
  imports: [BrowserModule, AppRoutingModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
