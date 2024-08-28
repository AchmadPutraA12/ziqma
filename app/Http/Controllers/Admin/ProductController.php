<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productBox = Product::with('subProductCategory')->where('type', 'box')->orderBy('name', 'asc')->get();
        $productRoll = Product::with('subProductCategory')->where('type', 'roll')->orderBy('name', 'asc')->get();
        return Inertia::render('Admin/Product/Index', [
            'products' => $productBox,
            'productsRoll' => $productRoll
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'mimes:png,jpg,jpeg,webp',
            'thickness' => 'required',
            'range' => 'required|numeric',
            'price' => 'required|integer',
            'price_per_square_meter' => 'required|integer',
            'sub_product_category_id' => 'required',
            'width' => 'required|numeric',
            'height' => 'required|numeric',
        ]);

        $foto = $request->file('image');
        $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
        $path = 'product-image/' . $filename;

        if (!Storage::disk('public')->exists('product-image')) {
            Storage::disk('public')->makeDirectory('product-image');
        }

        $manager = new ImageManager(new Driver());
        $image = $manager->read($foto->getRealPath());
        $image->toWebp()->save(storage_path('app/public/' . $path));

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $path,
            'price' => $request->price,
            'price_per_square_meter' => $request->price_per_square_meter,
            'thickness' => $request->thickness,
            'range' => $request->range,
            'pcs' => $request->pcs,
            'sub_product_category_id' => $request->sub_product_category_id,
            'width' => $request->width,
            'height' => $request->height,
            'type' => $request->type,
        ]);

        if ($product) {
            return back()->with('success', 'data Produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data Produk gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::find($id);
        if ($product) {
            return Inertia::render('Admin/Product/Show', [
                'product' => $product
            ]);
        } else {
            return back()->with('error', 'Data Produk tidak ditemukan');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'name' => 'required',
                'thickness' => 'required',
                'range' => 'required|numeric',
                'width' => 'required|numeric',
                'height' => 'required|numeric',
                'price' => 'required|integer',
                'price_per_square_meter' => 'required|integer',
                'sub_product_category_id' => 'required',
            ]);

            $product = Product::find($id);

            if (!$product) {
                return back()->with('error', 'Data Produk tidak ditemukan');
            }

            $product->update([
                'name' => $request->name,
                'description' => $request->description,
                'thickness' => $request->thickness,
                'range' => $request->range,
                'pcs' => $request->pcs,
                'price' => $request->price,
                'price_per_square_meter' => $request->price_per_square_meter,
                'sub_product_category_id' => $request->sub_product_category_id,
                'width' => $request->width,
                'height' => $request->height,
            ]);

            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }

                $foto = $request->file('image');
                $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
                $path = 'product-image/' . $filename;

                if (!Storage::disk('public')->exists('product-image')) {
                    Storage::disk('public')->makeDirectory('product-image');
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($foto->getRealPath());
                $image->toWebp()->save(storage_path('app/public/' . $path));

                $product->update(['image' => $path]);
            }

            return back()->with('success', 'Data Produk berhasil diubah');
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
            $product = Product::find($id);

            if ($product->productColors()->count() > 0) {
                return back()->with('error', 'Data Produk gagal dihapus, karena terdapat warna produk');
            }
            $product->delete();
            return back()->with('success', 'Data Produk berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restore($id)
    {

        try {
            $product = Product::onlyTrashed()->where('id', $id)->first();

            if ($product) {
                $product->restore();
                return back()->with('success', 'Data Produk berhasil direstore');
            } else {
                return back()->with('error', 'Data Produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $product = Product::onlyTrashed()->restore();

            if ($product > 0) {
                return back()->with('success', 'Semua Produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada Produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $product = Product::onlyTrashed()->where('id', $id)->first();

            if ($product) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                    $product->forceDelete();
                }
                return back()->with('success', 'Data Produk berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
