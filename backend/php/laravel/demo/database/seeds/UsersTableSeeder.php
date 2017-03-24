<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	DB::table('users')->insert([
            'name' => 'notecode',
            'email' => '59763908@qq.com',
            'password' => '123'
       	]); 

        DB::table('users')->insert([
            'name' => 'songerwei',
            'email' => '18210398096@163.com',
            'password' => '123'
       	]);
    }
}
