$(function() {
  tlog('hello, i\'m IM');

  initIM();
  initOps();
});

function initIM() {
  var o = (function(wph) {
    if (wph) {
      return {
        // “万屏汇”账号下的key/tokey/kefu_id
        appKey: "qf3d5gbj31ksh",
        token: "7LOURMaO/2Tq8ManAMQjzfPsUWiN5Wih53XtNAxKGX5JyOW+jbhxRYF1vk8H0nnQtJc13xDsv9zNGvgfbYRKug==",
        kefu_id: "KEFU146172533227799"
        //kefu_id: "KEFU1458527895642" // 这是客服1.0的客服ID
      }
    } else {
      return { 
        // 我自己账号下的融云demo: key/token/kefu_id
        appKey: "c9kqb3rdkh8vj",
        token: "3QB5iLhybnC5zJT8052/A9U7kI3mBcmOiWDFKS4Ab/vw71wuQLCBi7u1L3iFefhI7+88uVgHWGq5Ne+w8w5x3Q==",
        kefu_id: "KEFU146159103048511"
      } 
    }
  })(0);


  var tok = {
    user1: '3QB5iLhybnC5zJT8052/A9U7kI3mBcmOiWDFKS4Ab/vw71wuQLCBi7u1L3iFefhI7+88uVgHWGq5Ne+w8w5x3Q==',
    user2: 'vdVzNl8nUznEww+MPdMo79U7kI3mBcmOiWDFKS4Ab/ssYm8kSd7VPEDLKffBWzIscwWcUOiZ5065Ne+w8w5x3Q=='
  }

  im_load(o.appKey, tok[qs('user') || 'user1'], {
    on_text_msg: function(msg) {
      var p = $('<p>' + msg + '</p>')
      p.appendTo($('.msg'))
    },
    connected: function() {
      // im_send_msg_to_kefu("how are you", o.kefu_id)
    },
    on_text_msg: function (msg) {
      $('<p>' + msg + '</p>').appendTo($('body'));
    }
  })
}

function initOps() {
  $('#send').click(function () {
    var msg = $('#msg').val();
    var me = qs('user') || 'user1';
    var to = (me == 'user1') ? '2' : '1';
    im_send_msg(to, msg);
  })
}
