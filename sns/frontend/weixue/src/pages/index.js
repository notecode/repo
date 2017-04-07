// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-03-25 23:06:37
 
$(function() {
  var theOtherId = 0;

  api_ajax('/api/foo', {
    succ: function(json) {
      tlog(json.msg);
      $('#foo').text(json.msg);
    }
  });

  api_ajax('/api/users', {
    succ: function(json) {
      var users = json.users;
      var text = '';
      for (var i = 0; i < users.length; i++) {
        text += ('[' + users[i].id + ': ' + users[i].name + ']<br>');

        if (users[i].email === '59763908@qq.com') {
          theOtherId = users[i].id;
        }
      }

      $('#users').append('<p>' + text + '</p>');
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
    api_ajax('/api/profile', {
      succ: function(json) {
        $('#profile').append('<p>' + json.name + '</p>');
      },
      fail: function(json) {
      }
    });
  });

  $('#reg').click(function() {
    var data = {
      'name': 'song',
      'email': '59763908@qq.com',
      'password': 'songerv2',
      'password_confirmation': 'songerv2'
    };

    api_ajax_post('/api/register', data, {
      succ: function(json) {
        if (json.token) {
          localStorage.setItem('token', json.token);
        }
      },
      fail: function(json) {
      }
    });
  });

  $('#friend').click(function() {
    var data = {
      'recipient': theOtherId 
    };

    api_ajax_post('/api/befriend', data, {
      succ: function(json) {
      },
      fail: function(json) {
      }
    });
  });
})
