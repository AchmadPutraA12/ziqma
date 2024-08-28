<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\SubProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subProductCategories =
            SubProductCategory::with('productCategory')->get();
        return Inertia::render('Admin/SubProductCategory/Index', [
            'subProductCategories' => $subProductCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/SubProductCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|unique:sub_product_categories',
                'product_category_id' => 'required',

            ],
            [
                'name.required' => 'Nama harus diisi',
                'name.unique' => 'Sub kategori produk sudah ada',
            ]
        );

        $subProductCategory = SubProductCategory::create([
            'name' => $request->name,
            'product_category_id' => $request->product_category_id
        ]);

        if ($subProductCategory) {
            return back()->with('success', 'data sub kategori produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data sub kategori produk gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $subProductCategory = SubProductCategory::find($id);
        if ($subProductCategory) {
            return Inertia::render('Admin/SubProductCategory/Show', [
                'subProductCategory' => $subProductCategory
            ]);
        } else {
            return back()->with('error', 'Data sub kategori produk tidak ditemukan');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|unique:sub_product_categories,name,' . $id,
                'product_category_id' => 'required',
            ], [
                'name.required' => 'Nama harus diisi',
                'name.unique' => 'Sub kategori produk sudah ada',
            ]);

            $subProductCategory = SubProductCategory::find($id);

            if (!$subProductCategory) {
                return back()->with('error', 'Data sub kategori produk tidak ditemukan');
            }

            $subProductCategory->update([
                'name' => $request->name,
                'description' => $request->description,
                'product_category_id' => $request->product_category_id
            ]);

            return back()->with('success', 'Data sub kategori produk berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        try {
            $subProductCategory = SubProductCategory::find($id);

            if ($subProductCategory->products()->count() > 0) {
                return back()->with('error', 'Data sub kategori produk tidak dapat dihapus karena terdapat produk');
            }
            $subProductCategory->delete();
            return back()->with('success', 'Data sub kategori produk berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $subProductCategory = SubProductCategory::onlyTrashed()->where('id', $id)->first();

            if ($subProductCategory) {
                $subProductCategory->restore();
                return back()->with('success', 'Data sub kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Data sub kategori produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $subProductCategory = SubProductCategory::onlyTrashed()->restore();

            if ($subProductCategory > 0) {
                return back()->with('success', 'Semua sub kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak sub ada kategori produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $subProductCategory = SubProductCategory::onlyTrashed()->where('id', $id)->first();

            if ($subProductCategory) {
                if ($subProductCategory->image) {
                    Storage::disk('public')->delete($subProductCategory->image);
                    $subProductCategory->forceDelete();
                }
                $subProductCategory->forceDelete();
                return back()->with('success', 'Data sub kategori produk berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data sub kategori produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
