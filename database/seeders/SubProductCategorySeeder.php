<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subProductCategories = [
            [
                'id' => '5e977384-7be8-430a-9102-9a09edaaa8aa',
                'name' => 'Vinyl Plank',
                // 'description' => 'Vinyl Plank',
                'product_category_id' => '4f08a083-6715-4c3c-a264-c9bc52510a91',
                'slug' => 'vinyl-plank',
            ],
            [
                'id' => 'aa1a0e66-730b-4a47-a05c-71aeafb3e92a',
                'name' => 'Vinyl Roll',
                // 'description' => 'Vinyl Roll',
                'product_category_id' => '4f08a083-6715-4c3c-a264-c9bc52510a91',
                'slug' => 'vinyl-roll',
            ], [
                'id' => '5e977384-7be8-430a-9102-9a09edaaa8ab',
                'name' => 'Lantai Masjid',
                // 'description' => 'Lantai Masjid',
                'product_category_id' => '4f08a083-6715-4c3c-a264-c9bc52510121',
                'slug' => 'lantai-masjid',
            ],
            [
                'id' => '5e977384-7be8-430a-9102-9a09edaaa8a1',
                'name' => 'Lantai Masjid Krembangan',
                // 'description' => 'Lantai Masjid Krembangan',
                'product_category_id' => '4f08a083-6715-4c3c-a264-c9bc52510121',
                'slug' => 'lantai-masjid-krembangan',
            ]
        ];

        foreach ($subProductCategories as $subProductCategory) {
            \App\Models\SubProductCategory::create($subProductCategory);
        }
    }
}
