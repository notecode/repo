// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:37:35
 
requirejs(['./modules/foo/main', './modules/bar/main'], function(foo, bar) {
    var app = new T.Application();
    app.registerModules();
    app.start();
})

