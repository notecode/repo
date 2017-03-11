// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 12:09:33
 
var ctx = {
	map: undefined,
	timer: undefined, 
	assist: undefined,
	last_zoom: undefined,
	idx_selected: undefined,
	repair_mode: false,
	zindex: 100, // 文档说，默认是100
	city_center: [],
	bj: [116.3974, 39.91750],
	m_large_size: undefined,
	
	screens: [], // 所有屏幕
	add_screen: function(json) {
		var scr = new Screen();
		scr.dom = fill_screen_dom(json);
		scr.dom.find('.pin').css(ctx.pin_left_bottom('S'));

		scr.marker = new AMap.Marker({
			map: ctx.map,
// 			topWhenMouseOver: true, // 不靠谱，还是得在需要时setTop()
			icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
			content: scr.dom.get(0),
			offset: ctx.topleft_offset('S'),
			position: ctx.safe_pos(json)
		});

		//scr.bind_amap_events();
 		scr.bind_jquery_events();
		ctx.screens.push(scr);
	},

	// 坐标相关
	offset_map: function() {
		return (is_www() ? this._offset_map_www : this._offset_map_m());
	},
	_offset_map_www: {
		// 0-1: 左上角x y相对于marker点(针尖)的偏移
		// 2: width, 3: height (of the board)
		// 4-5: .pin's left/bottom (in .screen)
		// 一般，先调整好pin在.screen中的位置（即4-5），再量出左上角相对于针尖的偏移（即0-1）
		// 经验: [1]绝对值增，[5]也需同增，以保证针尖定位精确
		'L': [-28, -268,	168, 248,	21, -56], 
		'M': [-33, -128,	112, 110,	26, -51],
		'S': [-7, -38,   	26, 38,		0, 0]
	},
	_offset_map_m: function() {
		if (!being(this.m_large_size)) {
			var o = screen_top_left_offset();
			this.m_large_size = [o.x, o.y,  o.board_w, o.board_h,  o.pin_left, o.pin_bottom];
		}

		return {
			'L': this.m_large_size,
			'M': this._offset_map_www['M'],
			'S': this._offset_map_www['S'],
		}
	},

	topleft_offset: function(size) {
		var xy = this.offset_map()[size];
		return new AMap.Pixel(xy[0], xy[1]);
   	},
	pin_left_bottom: function(size) {
		var xy = this.offset_map()[size];
		return {left: xy[4] + 'px', bottom: xy[5] + 'px'}; 
	},
	screen_bounds: function(marker, size) {
  		var pos = marker.getPosition();
		var px = this.map.lnglatTocontainer([pos.getLng(), pos.getLat()]);		
		var rect = this.offset_map()[size];
		var b = {l: px.getX() + rect[0],
			t: px.getY() + rect[1],
			w: rect[2],
			h: rect[3],
			pinX: px.getX(),
			pinY: px.getY()
		};
		return b;
    },

	screens_in_view: function() {
		var screens = [];
		var bounds = this.map.getBounds();
		this.screens.xForEach(function(e) {
			if (bounds.contains(e.marker.getPosition())) {
				screens.push(e);
			}
		})

// 		tlog(screens.length);
		return screens;
	},

	// utils
	rect_2s: function(r) {
		return '(L: ' + r.l + ', T: ' + r.t + ', W: ' + r.w + ', H: ' + r.h + ')';
	},
	
	safe_pos: function(s) {
		if (being(s) && being(s.lng) && s.lng != 0) {
			return [s.lng, s.lat];
		} else if (being(this.map)) {
			return ctx.city_center;
		} else {
			return undefined; // 可作为参数，结果是添加在地图中间
		}
	},
	
	// a/b should be 'L' / 'M' / 'S'
	cmp_size: function(a, b) {
		if (a === b) {
			return 0;
		} else if (a < b) {
			return 1;
		} else {
			return -1;
		}
	}
};

