<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/foo', function (Request $request) {
    return ['succ' => 1, 'msg' => 'api:foo'];
});

Route::post('/login', 'JWTAuth\JWTAuthController@login');
Route::post('/register', 'JWTAuth\JWTRegisterController@register');

Route::middleware('jwt.refresh')->get('/user', 'JWTAuth\JWTAuthController@userProfile');

