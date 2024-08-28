<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Product extends Model
{
    use HasFactory, HasUuids, SoftDeletes, HasSlug;

    protected $fillable = [
        'name',
        'description',
        'image',
        'thickness',
        'range',
        'price',
        'price_per_square_meter',
        'pcs',
        'width',
        'height',
        'sub_product_category_id',
        'type'
    ];
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
    protected $dates = [
        'deleted_at'
    ];

    public function subProductCategory()
    {
        return $this->belongsTo(SubProductCategory::class);
    }

    public function productColors(): HasMany
    {
        return $this->hasMany(ProductColor::class);
    }
}
