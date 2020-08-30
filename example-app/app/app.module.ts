import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

/**
 * Our main App Module that contains only
 * project specific or complex modules
 */
@NgModule({
  imports: [BrowserModule, CoreModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
