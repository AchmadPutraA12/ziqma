<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CollaborationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collaborations = [
            [
                'name' => 'Bank Jatim',
                'image' => "collaboration-image/bankjatim.png",
            ],
            [
                'name' => 'PLN',
                'image' => "collaboration-image/pln.png",
            ]
        ];

        foreach ($collaborations as $collaboration) {
            \App\Models\Collaboration::create($collaboration);
        }
    }
}
