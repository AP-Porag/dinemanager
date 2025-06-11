<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Last',
            'email' => 'admin@app.com',
            'password' => Hash::make('12345678'),
            'user_type' => 'admin',
        ]);

        User::factory()->create([
            'first_name' => 'Waiter',
            'last_name' => 'Last',
            'email' => 'waiter@app.com',
            'password' => Hash::make('12345678'),
            'user_type' => 'waiter',
        ]);
    }
}
