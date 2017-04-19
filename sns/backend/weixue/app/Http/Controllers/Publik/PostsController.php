<?php

namespace App\Http\Controllers\Publik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;

class PostsController extends Controller
{
    public function index(Request $request)
    {
        return Post::all();
    }
}
