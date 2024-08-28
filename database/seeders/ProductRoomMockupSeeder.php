<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductRoomMockupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productRoomMockup = [
            [
                'id' => "1",
                'image' => "asa",
                'product_color_id' => '1',
                'room_id' => '1',
            ],
            [
                'id' => "2",
                'image' => "asa",
                'product_color_id' => '1',
                'room_id' => '2',
            ],
        ];

        foreach ($productRoomMockup as $productRoomMockup) {
            \App\Models\ProductRoomMockup::create($productRoomMockup);
        }
    }
}
