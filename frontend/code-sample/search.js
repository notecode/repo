// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 12:24:29

//@@ref: http://api.jqueryui.com/autocomplete/

function init_search_screen_box() {
	input_box_bind_enter('.map_search input', {
		on_enter: function(word) {
			search_screen(word);	
		}
	});
}

function search_screen(word) {
	var addr = word.split(' | ')[0];
	for (var i = 0; i < ctx.screens.length; i++) {
		var e = ctx.screens[i];
		if (addr === e.dom.find('.address').text()) {
			select_one(i);
			break;
		}
	}
}

function select_one(idx) {
	tlog('select item: ' + idx);
	var one = ctx.screens[idx];
	one.magnified_as_max();
	ctx.idx_selected = idx;
	ctx.map.setCenter(one.marker.getPosition());
}

function initAutoComplete(data) {
	var input_sel = '.map_search input';
	$(input_sel).autocomplete({
		source: data,
		minLength: 0
	})
	.autocomplete('option', 'position', { my : 'top+27', at: 'top+27' })
	.autocomplete('instance')._renderItem = function(ul, item) {
		return $('<li>')
			.append('<div class="ui-item-label"><div>' + item.addr
				+ '</div><div class="ui-item-status"><i class="ui-item-icon icon-green"></i>' + item.type + '</div></div>')
			.appendTo(ul);
	};
	
	// 此事件，pc上为滑过，m上为选中
	$(input_sel).on("autocompletefocus", function(event, ui) {
		var idx = ui.item.index;
		if (is_www()) {
			tlog('focus on auto item: ' + idx);
			ctx.assist.on_item_focus(idx);
		} else {
			select_one(idx);
			
		}
	});

	$(input_sel).on("autocompleteselect", function(event, ui) {
		$('.sc-input').addHide();
		$('.sc-search').attr('select','no');
		document.activeElement.blur();
		select_one(ui.item.index);
	})
	$(input_sel).autocomplete({
    	open: function(event, ui) {
        	$('.ui-autocomplete').off('menufocus hover mouseover mouseenter');
    	}
	});
	$(input_sel).unbind("blur");
	$(input_sel).on("autocompleteclose", function(event, ui) {
		tlog('close auto list');
		ctx.assist.on_list_lost_focus();
	});

	$('.ui-autocomplete').mouseleave(function() {
		tlog('leave auto list'); 
		ctx.assist.on_list_lost_focus();
	});
}

function is_list_hovered() {
	return $('.ui-autocomplete').is(':hover');
}

var ACAssist = function() {	
	this.last_focus = undefined;
}

ACAssist.prototype.on_item_focus = function(index) {
	if (this.last_focus != undefined) {
		var last = ctx.screens[this.last_focus];
		on_mouse_out(last, 'L');
	}		

	var cur = ctx.screens[index];
	ctx.map.setCenter(cur.marker.getPosition()); // 将此屏设为地图中心

	on_mouse_in(cur, 'L');
	this.last_focus = index;
}

ACAssist.prototype.on_list_lost_focus = function() {
	if (this.last_focus != undefined) {
		var last = ctx.screens[this.last_focus];
		on_mouse_out(last, 'L');
	}		

	this.last_focus = undefined;
}

function makeAutoItem(e, i) {
	var stat = a_screen_status_to_color(e.status);

	var addr = e.anli_name || e.address || e.city_name;
	var item = {
		index: i,
		label: addr + ' | ' + e.type,
		addr: addr,
		type: e.type
	}

	return item;
}

