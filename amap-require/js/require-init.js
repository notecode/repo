require.config({　　　　
	paths: {　　　　　　
	//	"amap": "http://webapi.amap.com/maps?v=1.3&key=&callback=init"　　　　
        "amap": "http://webapi.amap.com/maps?v=1.3&key=24a59ee2492ddf5fba6e8208f6383560&plugin=AMap.CitySearch&callback=init"
	}　　
});

// require(['amap'], function() {
// 	window.init = function() {
// 		require(['require-initMap'], function(mapIniter) {
// 			mapIniter.init();
// 		})

//         var map = new AMap.Map('container');
// 	}
// })
//

$(function() {
    require(['amap'], function() {
        var map = new AMap.Map('container');
    })
})
