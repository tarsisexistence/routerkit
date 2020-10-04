import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { appRouting } from './app.routes';

@NgModule({
  imports: [BrowserModule, CoreModule, appRouting],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
