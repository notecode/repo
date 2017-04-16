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

Route::get('/foo', 'FooController@index');
Route::get('/geo', 'FooController@geo');
Route::get('/geo-my', 'FooController@geoMy');
Route::get('/foo-sort', 'FooController@sort');

// UsersController

Route::get('/all-users', 'Publik\UsersController@all');
Route::get('/nearby-users', 'Publik\UsersController@nearby');
Route::get('/paging-users', 'Publik\UsersController@page');


// JWTAuthController

Route::post('/login', 'JWTAuth\JWTAuthController@login');

/*
 * @@todo:
 * 因每次都refresh token，需要对app端的请求进行排队，否则后续请求会因token失效而失败。
 * 故这里先不刷新token，一直用初始生成的。再完善：若实现了自动登录（将token记在本地，在每次
 * 用户打开应用时refresh一次，以避免出现某天某时刻token突然失效的不好体验
 */
Route::middleware('jwt.auth')->get('/profile', 'JWTAuth\JWTAuthController@myProfile');


// JWTRegisterController

Route::post('/register', 'JWTAuth\JWTRegisterController@register');


// FriendshipController

Route::middleware('jwt.refresh')->post('/befriend', 'FriendshipController@befriend');
