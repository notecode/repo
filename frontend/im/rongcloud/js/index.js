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
    user2: 'vdVzNl8nUznEww+MPdMo79U7kI3mBcmOiWDFKS4Ab/ssYm8kSd7VPEDLKffBWzIscwWcUOiZ5065Ne+w8w5x3Q==',
    user3: 'bI7jcJxAAm/CnncQ3rPZF9U7kI3mBcmOiWDFKS4Ab/ssYm8kSd7VPFG3Tm1ZuT7c3A5Yt5i4SYy5Ne+w8w5x3Q=='
  }

  var me = qs('user') || 'user1';
  $('#' + me).find('.send').attr('disabled', true);
  $('#' + me).find('.msg').val('不能给自己发消息~~');
  $('#cur-user').text('I am ' + me);

  im_load(o.appKey, tok[me], {
    connected: function() {
    },
    on_private_text_msg: function (msg, to, from) {
      var recv = $('#user' + to).find('.recv');
      $('<p>' + msg + '</p>').appendTo(recv);
    },
    on_group_text_msg: function (msg, to, from) {
      var recv = $('#group' + to).find('.recv');
      $('<p>user' + from + ' said: ' + msg + '</p>').appendTo(recv);
    }
  })
}

function initOps() {
  $('.send').click(function () {
    var msg = $(this).siblings('.msg').val();
    var parent = $(this).parent();
    var toID = parent.attr('rongID');
    if (parent.attr('id').indexOf('user') >= 0) {
      im_send_private_msg(toID, msg); 
    } else {
      im_send_group_msg(toID, msg); 
    }
  });
}
