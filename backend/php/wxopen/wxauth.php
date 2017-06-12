<?php

require 'wxbase.php';

class WxAuth extends WxBase
{
    function __construct()
    {
        parent::__construct(false);
    }

    function getUserInfo($code)
    {
        if (empty($code)) {
            return ['errcode' => -1, 'errmsg' => 'no code'];
        }

        // https://api.weixin.qq.com/sns/oauth2/access_token?
        //          appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

        $uri = 'https://api.weixin.qq.com/sns/oauth2/access_token';
        $resp = $this->req('GET', $uri, [
            'query' => [
                'appid' => $this->appid,
                'secret' => $this->secret,
                'code' => $code,
                'grant_type' => 'authorization_code'
            ]
        ]);

        if (!$this->isRespOK($resp)) {
            return $resp;
        }

        // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
        $uri2 = 'https://api.weixin.qq.com/sns/userinfo';
        $resp2 = $this->req('GET', $uri2, [
            'query' => [
                'access_token' => $resp->access_token,
                'openid' => $resp->openid,
                'lang' => 'zh_CN',
            ]
        ]);

        return $resp2;
    }
}
