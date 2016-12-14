import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }     from '../components/app/the';
import { HeadStylesComponent }  from '../components/head-styles/the';
import { BannerComponent }  from '../components/banner/the';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, HeadStylesComponent, BannerComponent ],
  bootstrap:    [ AppComponent, HeadStylesComponent ]
})
export class AppModule { }
