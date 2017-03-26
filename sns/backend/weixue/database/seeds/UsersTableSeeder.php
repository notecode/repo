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
            'email' => 'songerwei_cn@qq.com',
            'password' => Hash::make('songerv2')
        ]);
    }
}
