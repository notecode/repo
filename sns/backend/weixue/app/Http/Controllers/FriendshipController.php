<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use App\User;

class FriendshipController extends Controller
{
    //
    public function befriend(Request $request)
    {
        $me = JWTAuth::parseToken()->authenticate();
        $him = User::find($request->input('recipient'));


        $res = $me->befriend($him);

        return response()->json(['succ' => 1]);
    }
}
