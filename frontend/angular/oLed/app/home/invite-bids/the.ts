import { Component, OnInit } from '@angular/core';
import { BidsListService } from './bids-list.serv';

@Component({
  selector: 'invite-bids',
  templateUrl: './app/home/invite-bids/the.html',
  styleUrls: ['./app/home/invite-bids/the.css'],
  providers: [BidsListService]
})
export class InviteBidsComponent implements OnInit {
	bidsList = [];

	constructor(private serv: BidsListService) {}

	ngOnInit(): void {
    var _this = this;
    //this.serv.getBidsList().then(function(json) {
    this.serv.getMockBidsList().then(function(json) {
       _this.bidsList = json.list;
    });
	}

  stdTime(intm): string {
    return intm.substring(0, 10);
  }

  stdType(type): string {
    switch (type) {
      case "0":
        return '门头招牌';
      case "1":
        return '广告';
      default:
        return '不明';
    }
  }
}
