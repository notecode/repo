// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 17:12:48
 
function try_to_grow_screens(init) {
// 	tlog('try to grow screens(v2)');

	// 规则：先试图取5个可放大到max的，剩下的保持等大，尽可能放大
	var screens = init ? ctx.screens : ctx.screens_in_view();

	// 1. 试图取5个，并放大
	var maxable = [];

	// 1.1 如果有被选中的（搜索出来的），优先级最高（不这样的话它很容易被再次缩小）
	// 任意时刻，只会有1个被选中的
	if (being(ctx.idx_selected)) {
		var s = ctx.screens[ctx.idx_selected];
		if (screens.contains(s)) {
			s.switch_to_max();
			maxable.push(s);
		}
	}

	for (var i = 0; i < screens.length; i++) {
		var e = screens[i];
		if (e.is_max_size() || can_grow_to_max(screens, e)) {

			e.switch_to_max();	
			if (5 == maxable.push(e)) {
				break;
			}
		}	
	}

	// 2. 看剩下的可以放大到哪个size(保持一致)
	var can_max = true;
	var can_secondary = true;
	for (var i = 0; i < screens.length; i++) {
		var e = screens[i];
		if (!maxable.contains(e)) {
			if (can_max && !can_grow_to_max(screens, e)) {
				can_max = false;
			} 
			if (can_secondary && !can_grow_to_secondary(screens, e)) {
				can_secondary = false;
				break;
			}
		}
	}

	// 3. 放大
	if (can_max) {
		screens.xForEach(function(e) {
			if (!maxable.contains(e)) {
				e.switch_to_max(e);
			}
		})
	} else if (can_secondary) {
		screens.xForEach(function(e) {
			if (!maxable.contains(e)) {
				e.switch_to_secondary(e);
			}
		})
	}
}

// 先把所有屏打到S，再尝试grow(当然，可以再优化一下, 不用真的打到S，而是以S为参考)
function try_to_shrink_screens() {
	tlog('try to shrink screens(1. shrink all; 2. grow some)');

	ctx.screens.xForEach(function(e) {
		e.switch_to_min();
	});
	try_to_grow_screens();
}

function can_grow_to_max(siblings, screen) {
	return can_grow_to_size(siblings, screen, 'L');
}

function can_grow_to_secondary(siblings, screen) {
	return can_grow_to_size(siblings, screen, 'M');
}

/*
 * 能长到指定size吗？
 */ 
function can_grow_to_size(siblings, screen, size) {
// 	tlog('\n[try]:' + screen.address());
	var rect = screen.calc_rect_in_size(size);
	return !is_overlapped_with_others(siblings, rect, size, screen);
}

// 		} else if (1 == ctx.cmp_size(size, other.cur_size())) {
// 			continue;  // 试图长到的size比对方size大，那就可以遮住对方

function is_overlapped_with_others(siblings, rect, size, me) {
	for (var i = 0; i < siblings.length; i++) {
		var other = siblings[i];

		// 跳过自己，和最小号的(即可以遮住最小号)
		if (me === other || other.is_min_size()) {
			continue;
		} 
		
		if (is_overlapped(rect, other.cur_rect())) {
// 			tlog('!![overlapped]: ' + me.address() + '(' + size + ') vs. ' + other.address() + '(' + other.cur_size() + ')');
			return true; 	
		}
	}

	return false;
}

function is_overlapped(a, b) {
	var mL = Math.min(a.l, b.l);
	var mT = Math.min(a.t, b.t);
	var xR = Math.max((a.l + a.w), (b.l + b.w));
	var xB = Math.max((a.t + a.h), (b.t + b.h));

	// 如果横向上，2者占的范围大于等于2者宽度之和，则必不重叠；纵向上，同理
	var not_over = ((xR - mL) >= (a.w + b.w) || (xB - mT) >= (a.h + b.h));
	return !not_over;
}
