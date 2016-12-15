import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule  }   from '@angular/http';

import { AppComponent }     	from '../components/app/the';

import { BannerComponent }  	from '../components/banner/the';
import { InviteBidsComponent }  from '../components/invite-bids/the';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, BannerComponent, InviteBidsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
