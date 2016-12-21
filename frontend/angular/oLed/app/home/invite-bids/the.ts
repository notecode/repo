import { Component, OnInit, HostListener } from '@angular/core';
import { BidsListService } from './bids-list.serv';

@Component({
  selector: 'invite-bids',
  templateUrl: './app/home/invite-bids/the.html',
  styleUrls: ['./app/home/invite-bids/the.css'],
  providers: [BidsListService]
})
export class InviteBidsComponent implements OnInit {
	bidsList = [];
  cnt = 0;

	constructor(private serv: BidsListService) {}

	ngOnInit(): void {
    var _this = this;
    this.serv.getBidsList().then(function(json) {
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

  loadMore(): void {
    var _this = this;
    this.serv.getBidsList().then(function(json) {
       _this.bidsList = _this.bidsList.concat(json.list);
    });
  }

  @HostListener('document:scroll') onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      console.log('bottomed, load more ' + this.cnt++);
      this.loadMore();
    }
  }
}
