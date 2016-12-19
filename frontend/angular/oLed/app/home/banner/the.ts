import { Component } from '@angular/core';

@Component({
  selector: 'banner',
  templateUrl: './app/home/banner/the.html',
  styleUrls: ['./app/home/banner/the.css'],
})
export class BannerComponent  {
	showCounts = true;

	toggleShow(): void {
		this.showCounts = !this.showCounts;
	}
}
