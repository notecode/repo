<?php

require 'vendor/autoload.php';

/*
 * 封装微信几个基本api调用
 *
 * https://mp.weixin.qq.com/wiki
 *
 */

class WxBase
{
    protected $appid = 'wx4d732af7f1723968';
    protected $secret = '64854749bc25ad98372ed5cff8c077ff';

    // -----------------
    protected $apiBase = 'https://api.weixin.qq.com/cgi-bin/';
    protected $http;
    protected $accessToken;
    protected $log;
    protected $logLevel = Psr\Log\LogLevel::DEBUG;

    function __construct($bGetToken = true)
    {
        $this->log = new Katzgrau\KLogger\Logger(__DIR__.'/logs', $this->logLevel, [
            'appendContext' => false
        ]);

        // http://docs.guzzlephp.org/en/latest/
        $this->http = new \GuzzleHttp\Client([
            'base_uri' => $this->apiBase
        ]);

        $this->log->info("wx open api base: {$this->apiBase}");
        if ($bGetToken) {
            $this->accessToken = $this->getAccessToken();
        }
    }

    function isOK()
    {
        return strlen($this->accessToken);
    }

    protected function getAccessToken()
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

    protected function req($method, $uri, $opt)
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

    protected function isRespOK($resp)
    {
        return (!isset($resp->errcode) || 0 == $resp->errcode);
    }
}

