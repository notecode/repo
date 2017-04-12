<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
            'avatar' => 'avatar.jpg',
            'email' => 'songerwei_cn@qq.com',
            'password' => Hash::make('songerv2')
        ]);

        DB::table('users')->insert([
            'name' => 'song',
            'avatar' => 'avatar.jpg',
            'email' => '59763908@qq.com',
            'password' => Hash::make('songerv2')
        ]);

        factory(App\User::class, 100)->create();
    }
}
