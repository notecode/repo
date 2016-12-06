// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-02-24 14:58:02

function im_load(key, token, cb) {
	var ccb = (cb != undefined) ? cb : {}
	RongIMClient.init(key);
	//RongIMClient.init(key, new RongIMLib.WebSQLDataProvider());

	im_set_connecting_listener()
	im_set_recv_msg_listener(ccb)

	im_connect_server(token, ccb)
}

function im_connect_server(token, cb) {
	
	RongIMClient.connect(token, {
		onSuccess: function (userId) {
			// 此处处理连接成功。
			console.log("Login successfully. User ID: " + userId);

			if (cb.connected != undefined) {
				cb.connected()
			}
		},

		onError: function (errorCode) {
			// 此处处理连接错误。
			var info = '';
			switch (errorCode) {
			   case RongIMClient.callback.ErrorCode.TIMEOUT:
					info = '超时';
					break;
			   case RongIMClient.callback.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
					break;
			   case RongIMClient.ConnectErrorStatus.UNACCEPTABLE_PROTOCOL_VERSION:
					info = '不可接受的协议版本';
					break;
			   case RongIMClient.ConnectErrorStatus.IDENTIFIER_REJECTED:
					info = 'appkey不正确';
					break;
			   case RongIMClient.ConnectErrorStatus.SERVER_UNAVAILABLE:
					info = '服务器不可用';
					break;
			   case RongIMClient.ConnectErrorStatus.TOKEN_INCORRECT:
					info = 'token无效';
					break;
			   case RongIMClient.ConnectErrorStatus.NOT_AUTHORIZED:
					info = '未认证';
					break;
			   case RongIMClient.ConnectErrorStatus.REDIRECT:
					info = '重新获取导航';
					break;
			   case RongIMClient.ConnectErrorStatus.PACKAGE_ERROR:
					info = '包名错误';
					break;
			   case RongIMClient.ConnectErrorStatus.APP_BLOCK_OR_DELETE:
					info = '应用已被封禁或已被删除';
					break;
			   case RongIMClient.ConnectErrorStatus.BLOCK:
					info = '用户被封禁';
					break;
			   case RongIMClient.ConnectErrorStatus.TOKEN_EXPIRE:
					info = 'token已过期';
					break;
			   case RongIMClient.ConnectErrorStatus.DEVICE_ERROR:
					info = '设备号错误';
					break;
			}
			console.log("失败:" + info);
		}
	});
}

function im_set_connecting_listener() {
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            switch (status) {
				//链接成功
				case RongIMLib.ConnectionStatus.CONNECTED:
					console.log('链接成功');
					break;
				//正在链接
				case RongIMLib.ConnectionStatus.CONNECTING:
					console.log('正在链接');
					break;
				//重新链接
				case RongIMLib.ConnectionStatus.RECONNECT:
					console.log('重新链接');
					break;
				//其他设备登陆
				case RongIMLib.ConnectionStatus.OTHER_DEVICE_LOGIN:
				//连接关闭
				case RongIMLib.ConnectionStatus.CLOSURE:
				//未知错误
				case RongIMLib.ConnectionStatus.UNKNOWN_ERROR:
				//登出
				case RongIMLib.ConnectionStatus.LOGOUT:
				//用户已被封禁
				case RongIMLib.ConnectionStatus.BLOCK:
					break;
            }
		  }
	});
}

function im_set_recv_msg_listener(cb) {
     // 消息监听器
     RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            // 判断消息类型
            switch(message.messageType){
                case RongIMClient.MessageType.TextMessage:
                    var t = message.content.content;
                    console.log('im recv(from: ' + message.senderUserId + '): ' + t + (message.offLineMessage ? ', [offline msg]' : ''));

                    if (message.conversationType == RongIMLib.ConversationType.PRIVATE) {
                      if (cb.on_private_text_msg) {
                        cb.on_private_text_msg(t, message.targetId, message.senderUserId);
                      }
                    } else if (message.conversationType == RongIMLib.ConversationType.GROUP) {
                      if (cb.on_group_text_msg) {
                        cb.on_group_text_msg(t, message.targetId, message.senderUserId);
                      }
                    }
                    break;
                case RongIMClient.MessageType.ImageMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.VoiceMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.RichContentMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.LocationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.DiscussionNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.InformationNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ContactNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.ProfileNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.CommandNotificationMessage:
                    // do something...
                    break;
                case RongIMClient.MessageType.UnknownMessage:
                    // do something...
                    break;
                default:
                    // 自定义消息
                    // do something...
            }
        }
    });
}

function im_send_msg_to_kefu(text, kefu_id) {
    RongIMClient.getInstance().startCustomService();

    var msg = new RongIMLib.TextMessage({content: text});
 	var type = RongIMLib.ConversationType.CUSTOMER_SERVICE; // 客服会话类型

	RongIMClient.getInstance().sendMessage(type, kefu_id, msg, {
	   	onSuccess: function (msg) {
			// 发送消息成功
			console.log("Send successfully");
		},
		onError: function (errorCode) {
			// 发送消息失败
			console.log(errorCode);
		}
	}); 
} 

function im_send_private_msg(toID, text) {
  _im_send_msg(toID, text, RongIMLib.ConversationType.PRIVATE)
}

function im_send_group_msg(toID, text) {
  _im_send_msg(toID, text, RongIMLib.ConversationType.GROUP);
}

function _im_send_msg(toID, text, toType) {
  // 定义消息类型,文字消息使用 RongIMLib.TextMessage
  var msg = new RongIMLib.TextMessage({content: text, extra: "附加信息"});
  //或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
  //var msg = RongIMLib.TextMessage.obtain("hello");

	RongIMClient.getInstance().sendMessage(toType, toID, msg, {
		onSuccess: function () {
			console.log("Send successfully");
		},
		onError: function (errorCode) {
			var info = '';
			switch (errorCode) {
				case RongIMLib.callback.ErrorCode.TIMEOUT:
					info = '超时';
					break;
				case RongIMLib.callback.ErrorCode.UNKNOWN_ERROR:
					info = '未知错误';
					break;
				case RongIMLib.SendErrorStatus.REJECTED_BY_BLACKLIST:
					info = '在黑名单中，无法向对方发送消息';
					break;
				case RongIMLib.SendErrorStatus.NOT_IN_DISCUSSION:
					info = '不在讨论组中';
					break;
				case RongIMLib.SendErrorStatus.NOT_IN_GROUP:
					info = '不在群组中';
					break;
				case RongIMLib.SendErrorStatus.NOT_IN_CHATROOM:
					info = '不在聊天室中';
					break;
				default :
					info = x;
					break;
			}
			console.alert('发送失败:' + info);
		}
	});
}

function im_get_private_history_msg(withID, cb) {
  _im_get_history_msg(RongIMLib.ConversationType.PRIVATE, withID, cb); 
}

function im_get_group_history_msg(groupID, cb) {
  _im_get_history_msg(RongIMLib.ConversationType.GROUP, groupID, cb); 
}

function _im_get_history_msg(convType, withID, cb) {
  var conversationType = RongIMLib.ConversationType.PRIVATE; //私聊,其他会话选择相应的消息类型即可。
  var targetId = "xxx"; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
  var timestrap = null; // 默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
  var count = 20; // 每次获取的历史消息条数，范围 0-20 条，可以多次获取。
  RongIMLib.RongIMClient.getInstance().getHistoryMessages(convType, withID, null, 10, {
    onSuccess: function(list, hasMsg) {
      // list => Message 数组。
      // hasMsg => 是否还有历史消息可以获取。
      tlog('history msg count(with ' + withID + '): ' + list.length);
      cb && cb.succ(list, hasMsg);
    },
    onError: function(error) {
      console.log("GetHistoryMessages,errorcode:" + error);
    }
  });
}
