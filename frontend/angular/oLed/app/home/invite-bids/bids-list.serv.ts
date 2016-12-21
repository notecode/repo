import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BidsListService {

	constructor(private http: Http) {  }

	getBidsList(): Promise<any> {
		return this._getMockBidsList();
		//return this._getBidsList();
	}

	_getMockBidsList(): Promise<any> {
		var bid = {
			demand_id: "11170",
			client_id: "494517",
			nick: "马学超",
			sex: "1",
			type: "0",
			address: "郑州",
			size: "111.00",
			location: "1",
			color: "1",
			span: "P10",
			budget: "0",
			image: "",
			status: "10",
			_intm: "1481712944",
			_uptm: "1481713205",
			intm: "2016-12-14T18:55:44",
			uptm: "2016-12-14T19:00:05",
		};
		var mockData = {
			succ: "1",
			msg: "Success",
			now: "2016-12-14T19:11:33",
			user_id: 0,
			cnt: 12,
			list: [bid, bid, bid, bid]
		};
		return Promise.resolve(mockData);
	}

	_getBidsList(): Promise<any> {
		var _this = this;
		var url = "http://api.xxtao.com/index.php?r=demand%2Fb38&city_id=151&pagesize=20&sort_max=&sort_min=&sort=demand_id";
		return this.http.get(url)
               .toPromise()
			   .then(function(response) {
				  return response.json();
			   })
               .catch(() => console.log('http error'));	
	}
}
