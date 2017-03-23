<?php

use Illuminate\Database\Seeder;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('tasks')->insert([
       		'title' => 'eat',
       		'content' => 'banana'
       	]); 

       	DB::table('tasks')->insert([
       		'title' => 'play',
       		'content' => 'violin'
       	]); 
    }
}
