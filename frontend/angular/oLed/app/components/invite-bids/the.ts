import { Component, OnInit } from '@angular/core';

import { BidsListService } from './bids-list.serv';

@Component({
  selector: 'invite-bids',
  templateUrl: './app/components/invite-bids/the.html',
  styleUrls: ['./app/components/invite-bids/the.css'],
  providers: [BidsListService]
})
export class InviteBidsComponent implements OnInit {
	bidsList = [];

	constructor(private serv: BidsListService) {}

	ngOnInit(): void {
		this.serv.getMockBidsList().then(json => this.bidsList = json.list);
	}
}
