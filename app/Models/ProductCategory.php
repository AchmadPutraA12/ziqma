<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        // 'description',
        // 'image',
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function subProductCategories(): HasMany
    {
        return $this->hasMany(SubProductCategory::class);
    }
}
