// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-22 16:15:20
 
//@@todo: better be singleton
//@@ref: http://www.dofactory.com/javascript/singleton-design-pattern

var Timer = function() {
	this.growTimer = undefined;
	this.shrinkTimer = undefined;

	// 准备长大的屏
	this.growee = undefined;
}

var timer_cfg = {
	grow_wait: 		110, 	// all in ms
	shrink_wait: 	100,
	recover_wait: 	300
}

//@@note: 想调试这里时就放开，平时关闭
function timer_log(t) {
// 	tlog(t);
}

function on_mouse_in(screen, by) {
	//tlog('mouse in' + by + ': ' + screen.address());
	//ctx.map.setStatus({scrollWheel: false});

	if (screen.can_magnify()) {
		ctx.timer.startGrowTimer(screen, by);
	}
}

function on_mouse_out(screen, by) {
	//tlog('mouse out' + by + ': ' + screen.address());
	//ctx.map.setStatus({scrollWheel: true});

	if (screen.magnified) {
		ctx.timer.startShrinkTimer(screen);
	}
}

Timer.prototype.startGrowTimer = function(screen, by) {
	var by_list = ('L' == by); // 由悬停在list上的项而触发的？

	if (this.growTimer) {
		timer_log('screen(' + this.growee.address() + ') will NOT grow, it lost focus');
		clearTimeout(this.growTimer);
		
		this.growTimer = undefined;
		this.growee = undefined;
	} 

	this.growee = screen;
	timer_log('screen(' + screen.address() + ') will grow later');

	if (screen.is_hovered() || (by_list && is_list_hovered())) {
		this.growTimer = setTimeout(function() {
			screen.magnify();
			timer_log('screen(' + screen.address() + ') grown UP now!');

			// 补救一下鼠标移动过快造成的遗漏(若过一会，cursor既不在屏上，也不在list上，则此屏恢复原size)
			setTimeout(function() {
				if (!screen.is_hovered() && !is_list_hovered()) {
					timer_log('recover from exception');
					screen.to_origin_size();
				}
			}, timer_cfg.recover_wait);

		}, timer_cfg.grow_wait);
	} else {
		timer_log('mouse has gone quickly, need not grow');
		this.growee = undefined;
	}
}

Timer.prototype.startShrinkTimer = function(screen) {
	this.shrinkTimer = setTimeout(function() {
		if (!screen.is_hovered()) {
			screen.to_origin_size();	
		}
	}, timer_cfg.shrink_wait);
}

