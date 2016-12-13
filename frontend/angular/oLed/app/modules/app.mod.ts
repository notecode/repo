import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }     from '../components/app/app.comp';
import { BannerComponent }  from '../components/banner/banner.comp';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, BannerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
