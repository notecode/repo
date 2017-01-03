// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:51:20
 
define(function() {
    (function() {
        T.Module.Bar = T.createModule({
            start: function(resolve) {
                $(this._ctx).append('<h5>bar</h5>');
                resolve();
            }
        });
    })();
})
