<?php

require 'wxapi.php';

$api = new WxApi();
if ($api->isOK()) {
    // $api->getUserList();

    //$yoyo = 'o8Ia10t5S-pdyPq--WLxgI9uo-qM';
    //$api->sendTplMsg($yoyo, []);

    $notecode = 'o8Ia10r6uwLOPdFxtyXwUY9VzveI';
    $api->sendNewOrderMsg($notecode, []);
}
