// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-17 17:34:31

$(function() {

    var left = $('#left-bar > span');

    $('#main-table').on('scroll', function() {
        var top = $(this).scrollTop();
        tlog(top);

        left.css('top', -top+'px');
    });

    $('#triggee').toggle();

    $('#trigger').click(function() {
        $('#triggee').toggle();
    });

    $('#triggee').show(function() {
        tlog('triggee is shown');
    });
    $('#triggee').hide(function() {
        tlog('triggee is hidden');
    });
});

