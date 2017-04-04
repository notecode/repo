// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-03-25 23:06:37
 
$(function() {
  api_ajax('/api/foo', {
    succ: function(json) {
      tlog(json.msg);
      $('#foo').text(json.msg);
    }
  });

  $('#login').click(function() {
    var data = {
      'email': 'songerwei_cn@qq.com',
      'password': 'songerv2'
    };

    api_ajax_post('/api/login', data, {
      succ: function(json) {
        if (json.token) {
          localStorage.setItem('token', json.token);
        }
      },
      fail: function(json) {
        alert('login failed');
      }
    })
  });

  $('#user').click(function() {
    api_ajax('/api/user', {
      succ: function(json) {
        $('#profile').append('<p>' + json.name + '</p>');
      },
      fail: function(json) {
      }
    });
  });
})
