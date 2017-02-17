// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-17 18:17:17
 
define(function () {
    (function() {
        T.Module.Header = T.createModule({
            start: function(resolve, reject) {
                console.log('Hello, module header is OK');
            }
        });
    })();
})
