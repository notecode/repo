require.config({　　　　
	paths: {　　　　　　
		"amap": "http://webapi.amap.com/maps?v=1.3&key=&callback=init"　　　　
	}　　
});
require(['amap'], function() {
	window.init = function() {
		require(['require-initMap'], function(mapIniter) {
			mapIniter.init();
		})
	}
})