// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-03 19:51:20

define(function() {
    (function() {
        T.Module.Foo = T.createModule({
            start: function(resolve, reject) {
                this.fooX();
                this._events.on('t.sync', this.onSync);
            },

            onSync: function() {
                console.log('foo on sync');
            },

            fooX: function() {
                console.log('fooX');
            }
        });
    })();
})
