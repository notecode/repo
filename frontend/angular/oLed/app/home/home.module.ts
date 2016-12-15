import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule  }   from '@angular/http';

import { HomeComponent }     	from './home.component';

import { BannerComponent }  	from './banner/the';
import { InviteBidsComponent }  from './invite-bids/the';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ HomeComponent, BannerComponent, InviteBidsComponent ],
  bootstrap:    [ HomeComponent ]
})
export class HomeModule { }
