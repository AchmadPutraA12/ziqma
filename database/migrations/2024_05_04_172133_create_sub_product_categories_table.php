<?php

use App\Models\ProductCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_product_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            // $table->string('image')->nullable();
            // $table->text('description');
            $table->string('slug');
            $table->foreignUuid('product_category_id')->constrained()->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_product_categories');
    }
};
