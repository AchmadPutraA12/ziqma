<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductColor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use function Pest\Laravel\call;

class ProductColorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productColor = ProductColor::with('product')->get();
        return Inertia::render(
            'Admin/ProductColor/Index',
            [
                'productColors' => $productColor
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ProductColor/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'image' => 'mimes:png,jpg,jpeg,webp',
            'product_id' => 'required',
        ]);

        $product = Product::find($request->product_id);
        $foto = $request->file('image');
        $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
        $path = 'product-color-image/' . $filename;

        if (!Storage::disk('public')->exists('product-color-image/' . $product->name)) {
            Storage::disk('public')->makeDirectory('product-color-image/' . $product->name);
        }

        $manager = new ImageManager(new Driver());
        $image = $manager->read($foto->getRealPath());
        $image->toWebp()->save(storage_path('app/public/' . $path));

        $productColor = ProductColor::create([
            'name' => $request->name,
            'image' => $path,
            'product_id' => $request->product_id
        ]);

        if ($productColor) {
            return back()->with('success', 'data warna produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data warna produk gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $productColor = ProductColor::find($id);
        if ($productColor) {
            return Inertia::render('Admin/ProductColor/Show', [
                'productColor' => $productColor
            ]);
        } else {
            return back()->with('error', 'Data warna produk tidak ditemukan');
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
                'product_id' => 'required',
            ]);

            $productColor = ProductColor::find($id);

            if (!$productColor) {
                return back()->with('error', 'Data warna produk tidak ditemukan');
            }

            $productColor->update([
                'name' => $request->name,
                'product_id' => $request->product_id
            ]);

            $product = Product::find($request->product_id);

            if ($request->hasFile('image')) {
                if ($productColor->image) {
                    Storage::disk('public')->delete($productColor->image);
                }
                $foto = $request->file('image');
                $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
                $path = 'product-color-image/' . '/' . $filename;

                if (!Storage::disk('public')->exists('product-color-image/' . $product->name)) {
                    Storage::disk('public')->makeDirectory('product-color-image/' . $product->name);
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($foto->getRealPath());
                $image->toWebp()->save(storage_path('app/public/' . $path));

                $productColor->update(['image' => $path]);
            }

            return back()->with('success', 'data warna produk berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productColor = ProductColor::find($id);

        if ($productColor) {
            $productColor->delete();
            return back()->with('success', 'Data warna Produk berhasil dihapus');
        } else {
            return back()->with('error', 'Data warna Produk tidak ditemukan');
        }
    }

    public function restore($id)
    {
        try {
            $productColor = productColor::onlyTrashed()->where('id', $id)->first();

            if ($productColor) {
                $productColor->restore();
                return back()->with('success', 'Data Warna Produk berhasil direstore');
            } else {
                return back()->with('error', 'Data Warna Produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $productColor = productColor::onlyTrashed()->restore();

            if ($productColor > 0) {
                return back()->with('success', 'Semua Warna Produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada Warna Produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $productColor = productColor::onlyTrashed()->where('id', $id)->first();

            if ($productColor) {
                if ($productColor->image) {
                    Storage::disk('public')->delete($productColor->image);
                    $productColor->forceDelete();
                }
                return back()->with('success', 'Data Warna Produk berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data Warna Produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
