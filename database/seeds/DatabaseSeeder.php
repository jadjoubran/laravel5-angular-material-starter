<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call(UserTableSeeder::class);
        //JWT demo
        App\User::create([
            'name' => 'Jad Joubran',
            'email' => 'joubran.jad@gmail.com',
            'password' => bcrypt('laravel_angular'),
            ]);

        Model::reguard();
    }
}
