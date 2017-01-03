// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-01-02 01:24:59
 
$(function() {
    var emitter = new Emitter();

    emitter.on('foo', function(x, y) {
        console.log('foo1 ' + x + y);
    });
    emitter.on('foo', function(x, y) {
        console.log('foo2 ' + x + y);
    });


    emitter.on('bar', function(x) {
        console.log('bar1 ' + x);
    });

    emitter.emit('foo', 1, 2);
    emitter.emit('bar', 'zbc');
})


