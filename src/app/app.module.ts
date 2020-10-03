import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapinModule } from './mapin/mapin.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapinModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
