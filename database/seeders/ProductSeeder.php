<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'id' => 'b3946fa3-7f6f-4a1d-9c7c-964abf332fc9',
                'name' => 'Vinyl Box A',
                'description' => 'Vinyl Plank Description A',
                'thickness' => '2.5 mm',
                'image' => 'product-image/karpetbox.jpg',
                'price_per_square_meter' => 20000,
                'price' => 50000,
                'range' => 3345.00,
                'pcs' => 24,
                'width' => 10.00,
                'height' => 10.00,
                'slug' => 'vinyl-plank-a',
                'sub_product_category_id' => '5e977384-7be8-430a-9102-9a09edaaa8aa',
                'type' => 'box',
            ],
            // [
            //     'id' => '0c84d9c1-9c7e-48f6-b3aa-41b875f0f3ab',
            //     'name' => 'Vinyl Plank B',
            //     'description' => 'Vinyl Plank Description B',
            //     'thickness' => '2.75 mm',
            //     'price_per_square_meter' => 1000000,
            //     'price' => 30000000,
            //     'range' => 2680.75,
            //     'slug' => 'vinyl-plank-b',
            //     'pcs' => 30,
            //     'width' => 10.00,
            //     'height' => 10.00,
            //     'sub_product_category_id' => '5e977384-7be8-430a-9102-9a09edaaa8aa',
            //     'type' => 'box'
            // ],
            // [
            //     'id' => 'e7b13c5d-901a-4415-b7f4-747777aa70e6',
            //     'name' => 'Vinyl Roll A',
            //     'description' => 'Vinyl Roll Description A',
            //     'thickness' => '2.7 mm',
            //     'price_per_square_meter' => 1000000,
            //     'price' => 30000000,
            //     'range' => 5000.00,
            //     'pcs' => 20,
            //     'slug' => 'vinyl-roll-a',
            //     'width' => 10.00,
            //     'height' => 10.00,
            //     'sub_product_category_id' => 'aa1a0e66-730b-4a47-a05c-71aeafb3e92a',
            //     'type' => 'box'
            // ],
            // [
            //     'id' => '571cbf7b-9085-4b57-bc57-d42e376f56a3',
            //     'name' => 'Vinyl Roll B',
            //     'description' => 'Vinyl Roll Description B',
            //     'thickness' => '3.6 mm',
            //     'price_per_square_meter' => 1000000,
            //     'price' => 30000000,
            //     'range' => 4000.00,
            //     'pcs' => 15,
            //     'slug' => 'vinyl-roll-b',
            //     'width' => 10.00,
            //     'height' => 10.00,
            //     'sub_product_category_id' => 'aa1a0e66-730b-4a47-a05c-71aeafb3e92a',
            //     'type' => 'box'
            // ],
            [
                'id' => '571cbf7b-9085-4b57-bc57-d42e376f5611',
                'name' => 'Karpet Roll A',
                'description' => 'Karpet Roll Description A',
                'thickness' => '8 mm',
                'image' => 'product-image/karpetbox.jpg',
                'slug' => 'karpet-roll-a',
                'price_per_square_meter' => 1000000,
                'price' => 30000000,
                'range' => 4000.00,
                'width' => 10.00,
                'height' => 10.00,
                'sub_product_category_id' => 'aa1a0e66-730b-4a47-a05c-71aeafb3e92a',
                'type' => 'roll'
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
