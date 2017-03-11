// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-03-19 12:28:08

//@@refs: 
// http://lbs.amap.com/api/javascript-api/reference/map/
// http://lbs.amap.com/api/javascript-api/reference/overlay/#Marker 
// http://lbs.amap.com/api/javascript-api/reference/search_plugin/#m_AMap.Geocoder

$(function() {
	ctx.map = add_map();
	ctx.timer = new Timer(), 
	ctx.assist = new ACAssist(),
	init_search_screen_box();
	ctx.map.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    ctx.map.addControl(geolocation);
    $('.amap-geo').addHide();
    // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
	do_req_screens({
		succ: function(json) {
			if (json.list.length) {
				tlog('screens on map: ' + json.list.length);

				var autoCompleteData = [];
				json.list.xForEach(function(e, i) {
					ctx.add_screen(e);
				  	autoCompleteData.push(makeAutoItem(e, i));
				})

				ctx.map.setFitView(); // 显示出所有屏
				initAutoComplete(autoCompleteData);

				init_debug_tool();
			} else {
				show_no_screen_dialog()
			}

			if (cookie_utils.is_client()) {
				init_order_repair();
			}
		},
		fail: function(json) {

		}
	});
});

function do_req_screens(cb) {
	//@@test
	//if (false) {
	if (is_in_hour24()) {
		a_screen_req_case_screens(cb);	
	} else {
		a_screen_req_my_screens(cb);
	}
}

/*
 * city: {id: xx, name: xxx}
 */
function map_add_blank_sreen(demand_id, city) {
	// 因为banner中等的地方提交也会调用此方法，故需判断
	if (being(map)) {
		tlog("added a new screen to: (" + city.id + ':' + city.name + ')');
		var scr = add_screen(map, {
			status: 0,
			demand_id: demand_id,
			address: city.name 
		});

		// 定位
		AMap.plugin('AMap.Geocoder',function() {
			var geocoder = new AMap.Geocoder({});
			
			geocoder.getLocation(city.name, function(status, result) {
				if (status == 'complete' && result.geocodes.length) {
					var pos = result.geocodes[0].location;
					scr.setPosition(pos);
					map.setZoomAndCenter(5, pos)
				} else {
					tlog(result)
				}
			});
		});

		hide_no_screen_dialog();
	} else {
		tlog("no map, need not add screen")
	}
}

function add_map(center) {
	var map = new AMap.Map("container", {
// 		zoom: 5, 
		animateEnable: true,
		resizeEnable: true
	});

	//@@note: 地图中心会因为用户的拖到而变，但城市中心是固定的。故先取城市中心，保存下来
	tlog('map center: ' + map.getCenter());
	ctx.city_center = map.getCenter();

	AMap.plugin('AMap.ToolBar', function() {
		var toolBar = new AMap.ToolBar({
			ruler: false,
			direction: false,
			autoDirection: true
		});
		toolBar.hide();
		map.addControl(toolBar);
		if(is_www()){
			$('.zm_maplocal').click(function() {
				$('.amap-locate').trigger('click');
			})
			$('.zm_mapmagnify').click(function() {
				$('.amap-zoom-plus').trigger('click');
			})
			$('.zm_mapshrink').click(function() {
				$('.amap-zoom-minus').trigger('click');
			})
		}else{
			$('.zm_maplocal').click(function() {
				geolocation.getCurrentPosition()
			})
			$('.zm_mapmagnify').click(function() {
				map.zoomIn();
			})
			$('.zm_mapshrink').click(function() {
				map.zoomOut();
			})
		}
		
	});

	AMap.event.addListener(map, 'zoomend', function() {
		var cur_zoom = map.getZoom();

		if (ctx.last_zoom == undefined) {
			on_initial_zoom(cur_zoom);
		} else {
			if (cur_zoom > ctx.last_zoom) {
				on_zoom_in(cur_zoom);
			} else {
				on_zoom_out(cur_zoom);
			}
		}

		ctx.last_zoom = cur_zoom;
	});

	AMap.event.addListener(map, 'dragend', function() {
		on_drag_end();
	});

	return map;
}

function on_initial_zoom(zoom) {
	tlog('initial zoom: ' + zoom);
	try_to_grow_screens(true);
}

// 放大
function on_zoom_in(zoom) {
	tlog('zoomed in to: ' + zoom);
	try_to_grow_screens();
}

// 缩小
function on_zoom_out(zoom) {
	tlog('zoomed out to: ' + zoom);
	try_to_shrink_screens();
}

// 平移
function on_drag_end() {
	tlog('map drag end');
	try_to_shrink_screens();
}
