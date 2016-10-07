<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../../../vendor/autoload.php';
require 'db.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/zoo/', function (Request $request, Response $response) {
    $db = new DB('my_db'); 
    $response->withJson($db->getZoo());
    return $response;
});

$app->get('/cities/', function (Request $request, Response $response) {
    $db = new DB('my_db2'); 
    $response->withJson($db->getCityList());
    return $response;
});

$app->run();
