<?php

require 'wxbase.php';

class WxApi extends WxBase
{
    function __construct()
    {
        parent::__construct(true);
    }

    function getUserList() {
        // https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
        $resp = $this->req('GET', 'user/get', [
            'query' => [
                'access_token' => $this->accessToken,
            ],
        ]);

        // todo: 需要存一张 我们的id和openid的映射关系表，
        if ($this->isRespOK($resp)) {
            $list = $resp->data->openid;
            $post = [];
            foreach ($list as $v) {
                $post[] = [
                    'openid' => $v,
                    'lang' => 'zh_CN',
                ];
            }

            // https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN
            $resp2 = $this->req('POST', 'user/info/batchget', [
                'query' => [
                    'access_token' => $this->accessToken
                ],
                'json' => [
                    'user_list' => $post,
                ],
            ]);
        }
    }

    function sendNewOrderMsg($to, $data) {
        $body = [
            'touser' => $to,
            'template_id' => 'gP8-tpFFxPtoYoexDyXTdyUihq8i1PhWMsg9h0u9YVA',
            'data' => [
                'first' => [
                    'value' => 'hello',
                ],
                'keyword1' => [
                    'value' => 'foo',
                    'color' => '#00ff00',
                ],
                'keyword2' => [
                    'value' => 'bar',
                ],
                'remark' => [
                    'value' => 'bye',
                ],
            ],
        ];

        return $this->sendTplMsg($body);
    }

    function sendServiceExpiredMsg($to, $data) {
        // todo
    }

    //
    // --- below are privates ---
    //
    private function sendTplMsg($body) {
        // https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN
        $resp = $this->req('POST', 'message/template/send', [
            'query' => [
                'access_token' => $this->accessToken
            ],
            'body' => json_encode($body, JSON_UNESCAPED_UNICODE),
        ]);

        return $resp;
    }
}
