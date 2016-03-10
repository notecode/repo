//
// Javascript File
// AUTHOR:   SongErwei
// FILE:     script.js
// ROLE:    	
// CREATED:  2016-02-16 16:09:14
//

function add_marker(map, i, pos) {
	//var offset = new AMap.Pixel(-50, -50);
	var offset = new AMap.Pixel(0, 0);
	var cont = "<div id=\"marker" + i + "\" class=\"marker\"></div>"
	var marker = new AMap.Marker({
		//icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
		content: cont,
		//position: pos,
		offset: offset
	});

	marker.setMap(map);

	AMap.event.addListener(marker, 'mouseover', function(e) {
		console.log('mouse over')
		map.setStatus({
			scrollWheel: false
		});
	});
	AMap.event.addListener(marker, 'mouseout', function(e) {
		console.log('mouse out');
		map.setStatus({
			scrollWheel: true
		});
	});

	return marker;
}

(function() {
	var map = new AMap.Map("container", {
		resizeEnable: true,
		//center: [116.477823,39.9883],
		zoom: 15
	});

	AMap.plugin('AMap.ToolBar', function() {
		var toolBar = new AMap.ToolBar({
// 			ruler: false,
			direction: false,
			autoDirection: true
		});
// 		toolBar.hide();
		map.addControl(toolBar);

		$('.pos').click(function() {
			$('.amap-locate').trigger('click');
		})

		$('.in').click(function() {
			$('.amap-zoom-plus').trigger('click');
		})
		
		$('.out').click(function() {
			$('.amap-zoom-minus').trigger('click');
		})
	});

	AMap.plugin('AMap.Scale', function() {
		var scale = new AMap.Scale();
		map.addControl(scale);
	});


	var poses = [
		[116.471729,39.991654]
	];

	for (var i in poses) {
		add_marker(map, i, poses[i]);
	}
})();
