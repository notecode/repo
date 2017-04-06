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

Route::get('/users', 'Publik\UsersController@all');

Route::post('/login', 'JWTAuth\JWTAuthController@login');
Route::middleware('jwt.refresh')->get('/profile', 'JWTAuth\JWTAuthController@myProfile');

Route::post('/register', 'JWTAuth\JWTRegisterController@register');



