$(function() {
    var api = 'http://a.88ba.com/';

    /*
    $.ajax({
        url: api + 'Example/test',
        type: 'get',
        xhrFields: {
            withCredentials:true
        },  
        dataType: 'json',
        success: function(data){
            console.log(data)
        },  
    }); 
   */

    var data = {
        mobile: 18210398096,
        sms_captcha: '1234',
    };
    $.ajax({
        url: api + 'Login/handleLogin',
        data: data,
        type: 'post',
        xhrFields: {
            withCredentials:true
        },  
        dataType: 'json',
        success: function(data){
            console.log(data)
        },  
    }); 
})
