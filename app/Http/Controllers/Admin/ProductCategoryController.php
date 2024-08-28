<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{


    public function index()
    {
        $productCategories = ProductCategory::orderBy('name', 'asc')->get();
        return Inertia::render('Admin/ProductCategory/Index', [
            'productCategories' => $productCategories
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ProductCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name' => 'required|unique:product_categories',
            ],
            [
                'name.required' => 'Nama harus diisi',
                'name.unique' => 'Kategori produk sudah ada',
            ]
        );

        $productCategory = ProductCategory::create([
            'name' => $request->name,
        ]);

        if ($productCategory) {
            return back()->with('success', 'data kategori produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data kategori produk gagal ditambahkan');
        }
    }


    public function show(string $id)
    {
        $productCategory = ProductCategory::find($id);
        if ($productCategory) {
            return Inertia::render('Admin/ProductCategory/Show', [
                'productCategory' => $productCategory
            ]);
        } else {
            return back()->with('error', 'Data kategori produk tidak ditemukan');
        }
    }


    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required|unique:product_categories,name,' . $id,
            ], [
                'name.required' => 'Nama harus diisi',
                'name.unique' => 'Kategori produk sudah ada',
            ]);

            $productCategory = ProductCategory::find($id);

            if (!$productCategory) {
                return back()->with('error', 'Data kategori produk tidak ditemukan');
            }

            $productCategory->update([
                'name' => $request->name,
            ]);

            return back()->with('success', 'Data kategori produk berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        try {

            $productCategory = ProductCategory::findOrFail($id);

            if ($productCategory->subProductCategories()->count() > 0) {
                return Redirect::back()->with('error', 'Data kategori produk tidak dapat dihapus karena terdapat sub kategori produk');
            }

            $productCategory->delete();
            return Redirect::back()->with('success', 'Data kategori produk berhasil dihapus');
        } catch (ModelNotFoundException $e) {
            return Redirect::back()->with('error', 'Data kategori produk tidak ditemukan');
        }
    }

    public function restore($id)
    {
        try {
            $productCategory = ProductCategory::onlyTrashed()->where('id', $id)->first();

            if ($productCategory) {
                $productCategory->restore();
                return back()->with('success', 'Data kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Data kategori produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $productCategory = ProductCategory::onlyTrashed()->restore();

            if ($productCategory > 0) {
                return back()->with('success', 'Semua kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada kategori produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $productCategory = ProductCategory::onlyTrashed()->where('id', $id)->first();

            if ($productCategory) {
                if ($productCategory->image) {
                    Storage::disk('public')->delete($productCategory->image);
                    $productCategory->forceDelete();
                }
                $productCategory->forceDelete();
                return back()->with('success', 'Data kategori produk berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data kategori produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
