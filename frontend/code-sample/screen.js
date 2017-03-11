// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 17:01:22
 
var Screen = function() {
	this.dom = undefined;
	this.marker = undefined;
	
	this.magnified = false;
	this.origin_size = '';
} 

Screen.prototype.id = function() {
	return $(this.dom).find('.id').text();
}

Screen.prototype.cur_rect = function() {
	return this.calc_rect_in_size(this.cur_size());
}

Screen.prototype.calc_rect_in_size = function(size) {
	var rect = ctx.screen_bounds(this.marker, size);
// 	tlog(this.address() + ' (' + size + ') bounds: ' + ctx.rect_2s(rect)); 
	return rect;
}

Screen.prototype.cur_size = function() {
	//@@note: m端没有M这个size，故没有.board_mini
	
	if (!$(this.dom).find('.board').is('.hide')) {
		return 'L';
	} else if ($(this.dom).find('.board_mini').length > 0 && !$(this.dom).find('.board_mini').is('.hide')) {
		return 'M';
	} else {
		return 'S';
	}
}

Screen.prototype.is_max_size = function() {
	return ('L' == this.cur_size());
}
Screen.prototype.is_min_size = function() {
	return ('S' == this.cur_size());
}

Screen.prototype.switch_to_max = function() {
// 	tlog(this.address() + ' to max');
	this.switch_to_size('L');
}
Screen.prototype.switch_to_secondary = function() {
	this.switch_to_size('M');
}
Screen.prototype.switch_to_min = function() {
//  tlog(this.address() + ' to min');
	this.switch_to_size('S');
}

Screen.prototype.switch_to_size = function(to) {
	var cur = this.cur_size();
	if (to != cur) {
		if ('S' != cur) {
			$(this.dom).children('div').addHide();		
		}

		switch (to) {
			case 'L':
				$(this.dom).children('.board').removeHide();		
				break;
			case 'M':
				$(this.dom).children('.board_mini').removeHide();		
				break;
			default:
				break;
		}

 		this.marker.setOffset(ctx.topleft_offset(to));
		$(this.dom).find('.pin').css(ctx.pin_left_bottom(to));

		if (is_on_mobile()) {
			this.reset_content();
		}

		if ('L' === to || 'M' === to) {
// 			this.marker.setTop(true); // 不靠谱
			this.marker.setzIndex(++ctx.zindex);
		} else {
			this.marker.setzIndex(100);
		}
	}
}

// 在m端，放大后点击事件收不到。不得不再重新将content设置一下，以让amap更新点击区
Screen.prototype.reset_content = function() {
	this.marker.setContent(this.marker.getContent());
}

// 临时变大，好似放大镜放大的，故曰magnify
Screen.prototype.magnify = function() {
	this.origin_size = this.cur_size();
	this.switch_to_max();

	this.magnified = true;
}

// 放大且不还原
Screen.prototype.magnified_as_max = function() {
	this.switch_to_max();

	this.origin_size = '';
	this.magnified = false;
}

Screen.prototype.can_magnify = function() {
	return (this.cur_size() != 'L');
}

Screen.prototype.to_origin_size = function() {
	if (this.magnified) {
		this.switch_to_size(this.origin_size);

		this.origin_size = '';
		this.magnified = false;

		// 省着点用，以免溢出
		--ctx.zindex;
	} else {
		//assert1(false, "此屏未放大过，无需还原");
	}
}

Screen.prototype.address = function() {
	return $(this.dom).find('.address').text();
}

Screen.prototype.is_hovered = function() {
	return $(this.dom).is(':hover');
}

Screen.prototype.bind_jquery_events = function() {
	var screen = this;
	var detail_url = "screen-detail.html?id=" + screen.id();

	if (is_www()) {
		$(this.dom).mouseenter(function() {
			on_mouse_in(screen, '$');
		});
		$(this.dom).mouseleave(function() {
			on_mouse_out(screen, '$');
		});

		$(this.dom).click(function() {
			location.href = detail_url;
		})
	} else {
		this.marker.on('click', function() {
			location.href = detail_url;
		})
	}
}

Screen.prototype.bind_amap_events = function() {
	var screen = this;
	AMap.event.addListener(this.marker, 'mouseover', function(e) {
		on_mouse_in(screen, 'G');
	}); 

	AMap.event.addListener(this.marker, 'mouseout', function(e) {
		on_mouse_out(screen, 'G');
	});	
}

