// Javascript File
// AUTHOR:   SongErwei
// FILE:     api.js
// ROLE:     api基础、公用方法和对象 
// CREATED:  2016-01-24 11:04:50

var api = {
  url: (function() {
    var url = 'http://localhost:8000';
    tlog(url);
    return url;
  })(),

  withToken: true
}; 

function api_ajax(uri, cb, config) {
  _api_ajax('get', uri, null, cb, {}, config);
}

function api_ajax_post(uri, data, cb, config) {
  _api_ajax('post', uri, data, cb, {}, config);
}

//
// cb: callback
//
function _api_ajax(method, uri, data, cb, ext, config) {
  if (api.withToken) {
    var token = localStorage.getItem('token');
    if (token && token.length > 0) {
      $.extend(ext, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    }
  }

  var url = api.url + uri;
  olog("[>" + method + "](" + uri + "): ", data);
  $.ajax(url, $.extend({
    method: method,
    data: data,
    dataType: "json",
    timeout: 30000,
    xhrFields: {
      withCredentials: true
    },
    success: function(json, status, xhr) {
      olog("[<resp](" + uri + "): ", json);
      if (api.withToken) {
        var xtoken = xhr.getResponseHeader('Authorization');
        if (xtoken && xtoken.length > 0) {
          localStorage.setItem('token', xtoken.replace('Bearer ', ''));
        }
      }

      cb && cb.always && cb.always(json, json.now);
      cb && cb.succ && cb.succ(json, json.now);
    },

    error: function(xhr, status, thrown) {
      // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      if (status == "timeout") {
        tlog(uri + ' 请求超时!');
      }
      var code = as_int(xhr.status);
      var body = xhr.responseJSON;
      tlog("[!err!](" + uri + "): status: " + code + ", msg: " + thrown);
      olog("body: ", body);
      cb && cb.always && cb.always();

      var errorCallback = cb.error || cb.fail;
      errorCallback && errorCallback(body);
    }
  }, ext || {}));
}

