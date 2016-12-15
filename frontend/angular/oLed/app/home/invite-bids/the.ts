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
    this.serv.getBidsList().then(function(json) {
       _this.bidsList = json.list;
    });
	}
}
