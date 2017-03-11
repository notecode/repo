// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 12:25:04
 
function init_order_repair() {
	$('.closeSelect').click(function() {
		enter_myscreens_mode();
	})

	$('.fixSubmit').click(function() {
		var res = get_selected();
		a_screen_order_repair(res.ids.join(), {
			succ: function(json) {
				turn_selected_to_red();
				enter_myscreens_mode();
                show_repair_committed_tip();
			},
			fail: function(json) {

			}
		})
	})
} 

//@@require: 
// 	绿色的进入备选状态，
// 	灰色、红色进入禁选状态
function get_ready() {
	$('.screen').each(function(i, e) {
		var c = $(this).hasClass('green') ? 'onready' : 'onforbidden';
		$(this).find('span').addClass(c);
	})

	if ($('.screen span.onready').size() == 0) {
		todo('没有可报修的屏');
	}
}

// 跟get_ready 相反的动作
function normalize_all() {
	$('.screen span').removeClass();
}

//@@require:
//	如果是禁选状态，无响应；
//	否则，在 备选/选中 两个状态之间切换
function toggle_select(sel) {
	if (sel.hasClass('onforbidden')) {
		return false;
	} else {
		sel.toggleClass('onready onselect');
		return true;
	}
}

function turn_selected_to_red() {
	$('.screen span.onselect').parent().toggleClass('green red');
}

function has_selected() {
	return ($('.screen span.onselect').size() > 0);
}
function get_selected() {
	var res = {
		ids: [],
		cities: [],
		pic: ''
	};

	$('.screen span.onselect').each(function() {
		var screen = $(this).parent();
		res.ids.push(screen.find('.id').text());
		res.cities.push(screen.find('.address').text());
		
		// 取其中一个图，作为弹出气泡上的图
		if (!has(res.pic)) {
			var pic_uri = screen.find('.snapshot').attr('src');
			if (!pic_uri.contains('no_snap.png')) {
				res.pic = pic_uri;
			}
		}
	})

	return res;
}

function toggle_commit_stat(b) {
	var s = $('.fixSelect');
	var c = $('.fixSubmit');
	
	if (b) {
		s.hide();
	 	c.show();	
	} else {
		s.show();
		c.hide();
	}
}

function toggle_order_repair_mode() {
	if (!ctx.repair_mode) {
		enter_order_repair_mode();
	} else {
		exit_order_repair_mode();
	}
}

function enter_order_repair_mode() {
	if (!ctx.repair_mode) {
		ctx.repair_mode = true;	
		get_ready();
		$('.closeSelect').show();
		$('.selectFixscreen').show();
		toggle_commit_stat(false)
	}
}

function exit_order_repair_mode() {
	if (ctx.repair_mode) {
		ctx.repair_mode = false;	
		$('.closeSelect').hide();
		$('.selectFixscreen').hide();
		normalize_all();
	}
}
