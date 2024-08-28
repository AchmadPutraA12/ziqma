<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductColor;
use App\Models\ProductRoomMockup;
use App\Models\Room;
use App\Models\SubProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productCategory = ProductCategory::onlyTrashed()->get();
        $subProductCategory = SubProductCategory::with('productCategory')->onlyTrashed()->get();
        $product = Product::with('subProductCategory')->onlyTrashed()->get();
        $productColor = ProductColor::with('product')->onlyTrashed()->get();
        $room = Room::onlyTrashed()->get();
        $productRoomMockup = ProductRoomMockup::onlyTrashed()->with('productColor', 'room')->get();
        $collaboration =  Collaboration::onlyTrashed()->get();
        return Inertia::render('Admin/Backup/Index', [
            'productCategoryTrash'  => $productCategory,
            'subProductCategoryTrash' => $subProductCategory,
            'productTrash' => $product,
            'productColorTrash' => $productColor,
            'roomTrash' => $room,
            'productRoomMockupTrash' => $productRoomMockup,
            'collaborationTrash' => $collaboration
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
    public function show(string $id)
    {
        //
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
