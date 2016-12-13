import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }     from '../components/app/the';
import { BannerComponent }  from '../components/banner/the';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, BannerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
