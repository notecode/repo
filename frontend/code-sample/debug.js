// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 20:56:21
 
function init_debug_tool() {
    //@@dbg
	//$('.zm_maptools .debug_tool').removeClass('hidden');

	$('.zm_maptools .debug_tool').click(function() {
		debug_show_all_frames();
	})

	$('.zm_maptools .debug_tool').dblclick(function() {
		debug_clear_all_frames();
	})
}

function debug_clear_all_frames() {
	$('.the_map .debug-frame').remove();
	$('.the_map .debug-pin').remove();
}

function debug_show_all_frames() {
	debug_clear_all_frames();
		
	ctx.screens.xForEach(function(e) {
		var rect = e.cur_rect();
		var l = rect.l;
		var t = rect.t;
		var w = rect.w;
		var h = rect.h;

		var frm = '<div class="debug-frame" style="top: ' + t + 'px; left: ' + l + 'px; width: ' + w + 'px; height: ' + h + 'px;"></div>';
 		$(frm).appendTo($('.the_map'));
		
		var pin = '<div class="debug-pin" style="left: ' + (rect.pinX - 1) + 'px; top: ' + (rect.pinY - 1) + 'px;"></div>';
 		$(pin).appendTo($('.the_map'));

// 		var frm = '<div class="debug-frame" style="width: 100px; height: 100px; background-color: red;"></div>';
// 		e.marker.setContent(frm);
	});
}
