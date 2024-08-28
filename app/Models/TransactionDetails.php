<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionDetails extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [ 
        'transaction_id',
        'name_product',
        'color_product',
        'total',
        'total_price'
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
