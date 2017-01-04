// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:51:20
 
define(function() {
    (function() {
        T.Module.Bar = T.createModule({
            start: function(resolve) {
                this._events.on('t.sync', function() {
                    console.log('bar on sync');
                });
            }
        });
    })();
})
