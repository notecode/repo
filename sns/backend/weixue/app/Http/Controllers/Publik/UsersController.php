<?php

namespace App\Http\Controllers\Publik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;

class UsersController extends Controller
{
    public function all(Request $request)
    {
        return User::all();
    }

    public function page(Request $request)
    {
        return User::paginate($request->size);
    }
}
