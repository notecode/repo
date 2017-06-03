// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-17 17:34:31

$(function() {

    var left = $('#left-bar > span');

    var onClick = function() {
        console.log('clicked');
    }

    $('.trigger').on('click', function() {
        console.log('-');
        $('.group').off('click', '.trigger2', onClick).on('click', '.trigger2', onClick);
    });

});

