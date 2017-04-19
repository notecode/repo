<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 1920,
            'org_height' => 1200,
            'data_url' => 'http://oolhommuu.bkt.clouddn.com/pikugirl.jpg',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 506,
            'org_height' => 304,
            'data_url' => 'http://oolhommuu.bkt.clouddn.com/fengjing1.JPG',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 787,
            'org_height' => 1000,
            'data_url' => 'http://notecode.com:8080/images/me.jpg',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 640,
            'org_height' => 640,
            'data_url' => 'http://notecode.com:8080/images/ruziniu.jpg',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 3264,
            'org_height' => 2448,
            'data_url' => 'http://notecode.com:8080/images/ball.jpg',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 440,
            'org_height' => 594,
            'data_url' => 'http://notecode.com:8080/images/che.jpg',
        ]);
    }
}

