import { Injectable } from '@angular/core';

@Injectable()
export class BidsListService {
	mockData = {
		succ: "1",
		msg: "Success",
		now: "2016-12-14T19:11:33",
		user_id: 0,
		cnt: 12,
		list: [
			{
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
				supplier_list: [ ]
			},
		]
	},

	getMockBidsList(): Promise<any> {
		return Promise.resolve(this.mockData);
	}
}

