<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'name',
        'image',
    ];

    protected $dates = [
        'deleted_at',
    ];

    public function productRoomMockups()
    {
        return $this->hasMany(ProductRoomMockup::class);
    }
}
