<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FooController extends Controller
{
    public function index()
    {
        return ['succ' => 1, 'msg' => 'Foo is OK'];
    }
}
