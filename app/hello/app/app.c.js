// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-11-19 18:20:58
 
import api from './api/api';

export default class AppController {
  constructor(view) {
    this.view = view;
  }

  req_data() {
    var _this = this;
    api.get('demand/b37', {city_id: '151'}, {
      succ: function(json) {
        _this.view.on_data(json); 
      },
      fail: function(json) {
      }
    });
  }
}
