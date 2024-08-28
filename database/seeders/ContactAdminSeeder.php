<?php

namespace Database\Seeders;

use App\Models\ContactAdmin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContactAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContactAdmin::create([
            'id' => 1,
            'phone_number' => '081234815485'
        ]);
    }
}
