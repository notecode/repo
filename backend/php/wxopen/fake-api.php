<?php

require 'wxauth.php';

$auth = new WxAuth();

$code = $_GET['code'];
$auth->getUserInfo($code);
