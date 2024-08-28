<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductRoomMockup;
use App\Models\SubProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['productColors.productRoomMockup'])
            ->whereHas('productColors.productRoomMockup')
            ->get()
            ->map(function ($product) {
                $product->has_mockups = $product->productColors->some(function ($color) {
                    return !is_null($color->productRoomMockup);
                });
                $product->has_colors = $product->productColors->isNotEmpty();

                return $product;
            });

        return Inertia::render('User/Product/Index', [
            'products' => Inertia::lazy(function () use ($products) {
                return $products;
            })
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $subCategoryProduct = SubProductCategory::with('products')->where('slug', $slug)->first();

        return Inertia::render('User/Product/Show', [
            'subCategoryProduct' => $subCategoryProduct,
        ]);
    }

    public function ShowDetailProduct(string $slug, string $id)
    {
        $product = Product::where('slug', $slug)->where('id', $id)->firstOrFail();

        $produkMockup = ProductRoomMockup::whereHas('productColor', function ($query) use ($product) {
            $query->where('product_id', $product->id);
        })
            ->with('productColor', 'room')
            ->get();

        return Inertia::render('User/Product/showDetailProduct', [
            'product' => $product,
            'produkMockup' => $produkMockup
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
