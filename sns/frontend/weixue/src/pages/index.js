// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-03-25 23:06:37
 
$(function() {
  api_ajax('/foo', {
    succ: function(json) {
      tlog(json.msg);
    }
  })
})
