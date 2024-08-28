<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productColor = [
            [
                'id' => "1",
                'name' => 'Red',
                'image' => "asa",
                'product_id' => 'b3946fa3-7f6f-4a1d-9c7c-964abf332fc9',
            ],
            [
                'id' => "2",
                'name' => 'Blue',
                'image' => "asa",
                'product_id' => 'b3946fa3-7f6f-4a1d-9c7c-964abf332fc9',
            ],
        ];

        foreach ($productColor as $productColor) {
            \App\Models\ProductColor::create($productColor);
        }
    }
}
