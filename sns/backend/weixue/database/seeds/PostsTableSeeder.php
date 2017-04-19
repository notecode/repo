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
            'org_width' => 800,
            'org_height' => 600,
            'data_url' => 'http://oolhommuu.bkt.clouddn.com/pikugirl.jpg',
        ]);

        DB::table('posts')->insert([
            'author' => 1,
            'type' => 1,
            'org_width' => 800,
            'org_height' => 600,
            'data_url' => 'http://oolhommuu.bkt.clouddn.com/fengjing1.JPG',
        ]);
    }
}
