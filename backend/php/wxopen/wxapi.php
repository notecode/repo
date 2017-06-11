<?php

require 'vendor/autoload.php';

/*
 * 封装微信几个基本api调用
 *
 * https://mp.weixin.qq.com/wiki
 *
 */
class WxApi
{
    private $appid = 'wx4d732af7f1723968';
    private $secret = '64854749bc25ad98372ed5cff8c077ff';

    // -----------------
    private $apiBase = 'https://api.weixin.qq.com/cgi-bin/';
    private $http;
    private $accessToken;
    private $log;
    private $logLevel = Psr\Log\LogLevel::DEBUG;

    function __construct() 
    {
        $this->log = new Katzgrau\KLogger\Logger(__DIR__.'/logs', $this->logLevel, [
            'appendContext' => false
        ]);

        // http://docs.guzzlephp.org/en/latest/
        $this->http = new \GuzzleHttp\Client([
            'base_uri' => $this->apiBase
        ]);

        $this->log->info("wx open api base: {$this->apiBase}");
        $this->accessToken = $this->getAccessToken();

        // todo: 本地存储之，并防止过期引起的失败
    }

    function isOK() 
    {
        return strlen($this->accessToken);
    }

    function getUserList() {
        // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
        $resp = $this->req('GET', 'user/get', [
            'query' => [
                'access_token' => $this->accessToken,
            ],
        ]);

        // 需要存一张 我们的id和openid的映射关系表，
        if ($this->isRespOK($resp)) {

        }
    }

    function sendTplMsg($toWhom, $data) {
        // https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN
        $body = [
            'touser' => $toWhom,
            'template_id' => '5HsnDcHllU0jMBwMRTDWOyv0JxN_L5k_Qzea6N28mcM',
            'data' => [
                'first' => [
                    'value' => '你好',
                ],
                'tradeDateTime' => [
                    'value' => 'time',
                ],
                'orderType' => [
                    'value' => 'type',
                ],
                'customerInfo' => [
                    'value' => 'zhangsan',
                ],
                'orderItemName' => [
                    'value' => 'some name',
                ],
                'orderItemData' => [
                    'value' => '100',
                ],
                'remark' => [
                    'value' => '欢迎下次光临',
                ],
            ],
        ];
        $resp = $this->req('POST', 'message/template/send', [
            'query' => [
                'access_token' => $this->accessToken
            ],
            'body' => json_encode($body, JSON_UNESCAPED_UNICODE),
        ]);

        return $resp;
    }

    /*
     * 从我们网站，用企业微信扫码登录，调用此方法。其权限小，仅让你知道UserId
     */
    function getUserIdOnly($code) 
    {
        return $this->getUserInfo($code);
    }

    /*
     * 从企业微信登录，调用此方法。其权限大，可授权用户详细信息
     */
    function getUserData($code)
    {
        $resp = $this->getUserInfo($code);

        if ($this->isRespOK($resp) && isset($resp->user_ticket)) {
            // https://qyapi.weixin.qq.com/cgi-bin/user/getuserdetail?access_token=ACCESS_TOKEN
            $details = $this->req('POST', 'user/getuserdetail', [
                'query' => [
                    'access_token' => $this->accessToken,
                ],
                'json' => [
                    'user_ticket' => $resp->user_ticket
                ]
            ]);

            if (isset($details->department)) {
                $depart = $details->department;
                $details->zmoa_roles = [
                    'is_admin' => !empty(array_intersect($this->roleInDepart['admin'], $depart)),
                    'is_sales' => !empty(array_intersect($this->roleInDepart['sales'], $depart)),
                    'is_engnr' => !empty(array_intersect($this->roleInDepart['engnr'], $depart)),
                ];
                $details->role = $this->genRole($details->zmoa_roles);

                $json = json_encode($details->zmoa_roles);
                $this->log->info("zmoa_roles: {$json}");
            }
            return $details;
        } else {
            return $resp;
        }
    }

    //
    // --- below are privates ---
    //

    private function genRole($zmoa_roles)
    {
        if ($zmoa_roles['is_admin']) {
            return ROLE_SYSTEM_ADMIN;
        } else if ($zmoa_roles['is_sales']) {
            return ROLE_SALES;
        } else {
            return ROLE_SERVICE;
        }
    }

    private function getUserInfo($code) 
    {
        // https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE
        $resp = $this->req('GET', 'user/getuserinfo', [
            'query' => [
                'access_token' => $this->accessToken,
                'code' => $code
            ]
        ]);

        return $resp;
    } 

    private function getAccessToken()
    {
        // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        $resp = $this->req('GET', 'token', [
            'query' => [
                'grant_type' => 'client_credential',
                'appid' => $this->appid,
                'secret' => $this->secret,
            ]
        ]);

        if ($this->isRespOK($resp) && isset($resp->access_token)) {
            $token = $resp->access_token;
            $this->log->info("access_token: {$token}");
            return $token;
        } else {
            $this->log->error("[!!err]request access_token failed");
            return '';
        }
    }

    private function req($method, $uri, $opt) 
    {
        $sOpt = json_encode($opt, JSON_UNESCAPED_UNICODE);
        $this->log->info(">>req({$method}) uri: {$uri}");
        $this->log->info("  options: {$sOpt}");

        $resp = $this->http->request($method, $uri, $opt);

        $code = $resp->getStatusCode();
        $body = $resp->getBody();

        $this->log->info("<<resp({$code}): {$body}");

        $obj = json_decode($body);
        return $obj;
    }

	private function isRespOK($resp) 
	{
		return (!isset($resp->errcode) || 0 == $resp->errcode);
	}

}
