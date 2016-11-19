// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-11-19 16:22:14
 
export default class utils {
  static tlog(text) {
    console.log(text);
  }

  static olog(pre, obj) {
    var t = pre + JSON.stringify(obj);
    var max = 500;
    if (t.length < max) {
      utils.tlog(t)
    } else {
      utils.tlog(t.substring(0, max) + ' ... [total: ' + t.length + ']')
    }
  }
}

