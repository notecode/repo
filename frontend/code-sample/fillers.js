// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 12:22:51
 
function fill_screen_dom(json) {
	var frame = $('.screen.hide').clone();
	frame.removeHide();
	frame.find('.id').text(json.demand_id);

	fill_one(frame, filler, json);
	fill_one(frame.find('.board_mini'), filler_mini, json);

	return frame;
}

function fill_one(dom, filler, json) {
	filler.attach(dom);
	visit_screen_json(json, filler);
	filler.detach();
}

var filler = {
	data: '',
	attach: function(large) {
		this.data = large;
	},
	detach: function() {
		this.data = undefined;
	},
	on_pic: function(url) {
		this.data.find('.snapshot').attr('src', url);
	},
	on_address: function(addr) {
		this.data.find('.address').text(addr);
	},
	on_type: function(type) {
		// 仅24H页，显示屏类型
		if (is_in_hour24()) {
			this.data.find('.type').text(type).removeHide();
		}
	},
	on_nick_phone: function(nick, phone) {
		// 仅后台，显示contact
			if (!is_in_hour24()) {
				if (has(nick) || has(phone)) {
					var c = nick + ' ' + phone; 
					this.data.find('.contact').text(c).removeHide();
				}
			}
		
   	},
	clr_status_map: {
		'green': '状态良好',
		'red': '维修中...',
		'gray': '建设中...'
	},
	on_status: function(s) {
		this.data.addClass(s);
		// 故障时，“蹦”效果
		if ('red' == s) {
			var c = 'bouncein animated4';
			this.data.find('.board').addClass(c);
			this.data.find('.board_mini').addClass(c);
		}
		this.data.find('.stat').text(this.clr_status_map[s]);
	}
}

var filler_mini = {
	data: '',
	attach: function(mini) {
		this.data = mini;
	},
	detach: function() {
		this.data = undefined;
	},
	//@@todo
}

function visit_screen_json(json, filler) {
	var visit_prop = function(on, prop, json) {
		if (filler[on]) {
			if (being(json[prop]) && has(json[prop])) {
				filler[on](json[prop]);
			}
		}
	}

	if (filler.on_pic) {
		if (has(json.demand_pic)) {
			filler.on_pic(json.demand_pic[0]);
		}
	}
	
    // 下面这几位，后面的优先级高，覆盖前面的值
	visit_prop('on_address', 'city_name', json);
	visit_prop('on_address', 'address', json);
	visit_prop('on_address', 'anli_name', json);
	visit_prop('on_type', 'type', json);
	

	//@@test
	//json.contact_nick = "李四";

	if (filler.on_nick_phone) {
		if (being(json.contact_nick) && being(json.contact_phone)) {
			filler.on_nick_phone(json.contact_nick, json.contact_phone);
		}
	}

	if (filler.on_status) {
		if (being(json.status)) {
			var c = a_screen_status_to_color(json.status);
			filler.on_status(c);	
		}
	}
}

