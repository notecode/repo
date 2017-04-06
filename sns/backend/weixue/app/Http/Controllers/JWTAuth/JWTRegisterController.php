<?php

namespace App\Http\Controllers\JWTAuth;

use Illuminate\Foundation\Auth\RedirectsUsers;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Auth\Events\Registered;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use \App;

class JWTRegisterController extends RegisterController
{
    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        // $rongIM = App::make('RongIM');

        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        //
        // below, are copied from JWTAuthController, repeated.
        //

        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        $succ = 1;
        return response()->json(compact('succ', 'token'));
    }
}
