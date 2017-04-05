<?php

namespace App\Http\Controllers\JWTAuth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class JWTAuthController extends Controller
{
    public function login(Request $request)
    {
        // grab credentials from the request
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

    public function userProfile(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $succ = 1;
        $id = $user->id;
        $name = $user->name;
        return response()->json(compact('succ', 'id', 'name'));
    }
}