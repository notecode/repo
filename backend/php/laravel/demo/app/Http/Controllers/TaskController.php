<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index()
    {
        //$tasks = Task::all();
        $tasks = DB::table('tasks')->get();
        return $tasks;
    }
}
