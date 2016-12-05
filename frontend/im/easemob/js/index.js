$(function () {
  tlog('hello');

  var conn = initIM();
  initOps(conn);
})

function initIM() {
  var conn = new WebIM.connection({
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions
  });

  conn.listen({
    onOpened: function ( message ) {          //连接成功回调
      // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
      // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
      // 则无需调用conn.setPresence();             

      tlog(message);
      conn.setPresence();             
    },  
    onClosed: function ( message ) {},         //连接关闭回调
    onTextMessage: function ( message ) {
      var msg = message.data;
      tlog(msg);
      $('<p>' + msg + '</p>').appendTo($('body'));
    }, 

    onEmojiMessage: function ( message ) {},   //收到表情消息
    onPictureMessage: function ( message ) {}, //收到图片消息
    onCmdMessage: function ( message ) {},     //收到命令消息
    onAudioMessage: function ( message ) {},   //收到音频消息
    onLocationMessage: function ( message ) {},//收到位置消息
    onFileMessage: function ( message ) {},    //收到文件消息
    onVideoMessage: function ( message ) {},   //收到视频消息
    onPresence: function ( message ) {},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function ( message ) {},         //处理好友申请
    onInviteMessage: function ( message ) {},  //处理群组邀请
    onOnline: function () {},                  //本机网络连接成功
    onOffline: function () {},                 //本机网络掉线
    onError: function ( message ) {}           //失败回调
  });

  var options = { 
    apiUrl: WebIM.config.apiURL,
    user: qs('user') || 'NoteCode',
    pwd: qs('pwd') || qs('pass') || 'songerv2',
    appKey: WebIM.config.appkey
  };

  tlog('User: ' + options.user);
  conn.open(options);
  return conn;
}

function initOps(conn) {
  $('#send').click(function() {
    var id = conn.getUniqueId();                 // 生成本地消息id
    var msg = new WebIM.message('txt', id);      // 创建文本消息
    msg.set({
      msg: $('#msg').val() || 'haha',
      to: qs('to') || 'NoteCode2',
      roomType: false,
      success: function (id, serverMsgId) {
        console.log("send private text Success");
      }
    });
    msg.body.chatType = 'singleChat';
    conn.send(msg.body);
  });
}
