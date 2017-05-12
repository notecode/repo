import axios from 'axios';
import qs from 'querystring';

export default {
  _log: function(pre, obj) {
    var t = pre + JSON.stringify(obj);
    var max = 100;
    if (t.length < max) {
      console.log(t)
    } else {
      console.log(t.substring(0, max) + ' ... [total: ' + t.length + ']')
    }
  },

  _url: (function() {
    var url = 'http://zmoa.bxland.com/';
    var host = location.host;

    if (host.indexOf('.wanpinghui.com') != -1) {
      url = location.protocol + '//' + 'oaapi.wanpinghui.com/';
    } else if (host.indexOf('.88ba.com') != -1) {
      url = location.protocol + '//' + 'oaapi.88ba.com/';
    }

    console.log('api: ' + url);
    return url;
  })(),

  _ajax: function(method, uri, data, cb) {
    var _this = this;
    this._log("[>" + method + "](" + uri + "): ", data);
    
    var bGet = ('get' == method);
    var query = (data && bGet) ? ('?' + qs.stringify(data)) : '';
    var body = (data && !bGet) ? qs.stringify(data) : '';
    axios({
      method: method,
      url: uri + query, 
      baseURL: this._url,
      data: body, 
      withCredentials: true,
      headers: {
        //'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
    })
    .then(function (resp) {
      var json = resp.data;
			_this._log("[<resp](" + uri + "): ", json);

			cb && cb.always && cb.always(json);
			var ec = json.errcode;
			if (200 == resp.status && (null == ec || 0 == ec)) {
				cb && cb.succ && cb.succ(json);
			} else {
				cb && cb.fail && cb.fail(json);
			}
    })
    .catch(function (error) {
      console.log(error);
			cb && cb.always && cb.always();
			cb && cb.fail && cb.fail(error);
    });
  },

  get: function(uri, cb) {
    this._ajax('get', uri, null, cb);
  },

  // 带query的get请求
  get_q: function(uri, q, cb) {
    this._ajax('get', uri, q, cb);
  },

  post: function(uri, data, cb) {
    this._ajax('post', uri, data, cb);
  },
}
