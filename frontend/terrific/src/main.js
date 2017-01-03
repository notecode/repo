// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:37:35
 
requirejs(['./modules/foo', './modules/bar'], function(foo, bar) {
    console.log('main');
    var app = new T.Application();
    app.registerModules();
    app.start();
})

