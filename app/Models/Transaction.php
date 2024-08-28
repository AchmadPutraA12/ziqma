<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice',
        'name',
        'email',
        'no_telp',
        'address',
        'status',
        'amount',
    ];

    public function transaction_details()
    {
        return $this->hasMany(TransactionDetails::class);
    }
}
