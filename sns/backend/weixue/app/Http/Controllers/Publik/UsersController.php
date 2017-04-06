<?php

namespace App\Http\Controllers\Publik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    public function all(Request $request)
    {
        $succ = 1;
        $users = User::all();
        return response()->json(compact('succ', 'users'));
    }
}
