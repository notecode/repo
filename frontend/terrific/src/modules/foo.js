// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:51:20

define(function() {
    (function() {
        T.Module.Foo = T.createModule({
            start: function(resolve) {
                $(this._ctx).append('<h1>foo</h1>');
                resolve();
            }
        });
    })();
})
