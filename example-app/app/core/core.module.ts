import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from '../views/home/home.module';
import { UsersModule } from '../views/users/users.module';
import { AppHub } from '../hub/app.hub';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { ViewComponent } from './components/view/view.component';

const components = [
  HeaderComponent,
  FooterComponent,
  ContentComponent,
  ViewComponent
];

/**
 * CoreModule is handling imports
 * framework-specific modules to expand app functionality,
 * third-party libraries,
 * main (not reusable) components and providers
 * on root level (header, footer etc)
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppHub,
    HomeModule,
    UsersModule
  ],
  declarations: components,
  exports: [AppHub, ...components]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    core: CoreModule
  ) {
    if (core) {
      throw new Error(`Core module must not be imported twice!`);
    }
  }
}
