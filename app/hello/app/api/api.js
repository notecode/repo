// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-11-19 15:49:33

import axios from 'axios';
import extend from 'extend';
import utils from '../lib/utils';

export default class api {
  static get(r, q, cb) {
    axios.get('http://api.xxtao.com/index.php', {
      params: extend({
        'r': r
      }, q) 
    })
    .then(function (response) { 
      var resp = response.data;
      utils.olog('axios resp:', resp);

      cb && cb.always && cb.always(resp);
      if (1 == resp.succ) {
        cb && cb.succ && cb.succ(resp);
      } else {
        cb && cb.fail && cb.fail(resp);
      }
    })
    .catch(function (error) {
      utils.tlog(error);
      cb && cb.always && cb.always(resp);
      cb && cb.fail && cb.fail({});
    });
  }
}
