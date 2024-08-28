<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductRoomMockup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProductRoomMockupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productRoomMockup = ProductRoomMockup::with('productColor', 'room')->get();
        return Inertia::render(
            'Admin/ProductRoomMockup/Index',
            [
                'productRoomMockup' => $productRoomMockup
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ProductRoomMockup/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'mimes:png,jpg,jpeg,webp',
            'product_color_id' => 'required',
            'room_id' => 'required',
        ]);

        if ($request->file('image')) {
            $foto = $request->file('image');
            $filename = uniqid() . '.' . $foto->getClientOriginalName(). '.webp';
            $path = 'product-room-mockup-image/' . $filename;

            if (!Storage::disk('public')->exists('product-room-mockup-image')) {
                Storage::disk('public')->makeDirectory('product-room-mockup-image');
            }

            $manager = new ImageManager(new Driver());
            $image = $manager->read($foto->getRealPath());
            $image->toWebp()->save(storage_path('app/public/' . $path));

            $productRoomMockup = ProductRoomMockup::create([

                'image' => $path,
                'product_color_id' => $request->product_color_id,
                'room_id' => $request->room_id
            ]);
        }

        if ($productRoomMockup) {
            return back()->with('success', 'data mockup room product berhasil ditambahkan');
        } else {
            return back()->with('error', 'data mockup room product gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $productRoomMockup = ProductRoomMockup::find($id);
            if ($productRoomMockup) {

                return Inertia::render('Admin/ProductRoomMockup/Show', [
                    'productRoomMockup' => $productRoomMockup
                ]);
            }
        } catch (\Throwable $th) {
            return back()->with('error', 'data mockup room product tidak ditemukan');
        }
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
        try {
            $request->validate([
                'product_color_id' => 'required',
                'room_id' => 'required',
            ]);

            $productRoomMockup = ProductRoomMockup::find($id);

            if (!$productRoomMockup) {
                return back()->with('error', 'Data mockup room product tidak ditemukan');
            }

            $productRoomMockup->update([

                'product_color_id' => $request->product_color_id,
                'room_id' => $request->room_id
            ]);

            if ($request->file('image')) {
                if ($productRoomMockup->image) {
                    Storage::disk('public')->delete($productRoomMockup->image);
                }

                $foto = $request->file('image');
                $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
                $path = 'product-room-mockup-image/' . $filename;

                if (!Storage::disk('public')->exists('product-room-mockup-image')) {
                    Storage::disk('public')->makeDirectory('product-room-mockup-image');
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($foto->getRealPath());
                $image->toWebp()->save(storage_path('app/public/' . $path));

                $productRoomMockup->update([
                    'image' => $path
                ]);
            }

            return back()->with('success', 'data mockup room product berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $productRoomMockup = ProductRoomMockup::find($id);
            if ($productRoomMockup) {
                $productRoomMockup->delete();
                return back()->with('success', 'data mockup room product berhasil di hapus');
            } else {
                return back()->with('error', 'data mockup room product tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $productRoomMockup = ProductRoomMockup::onlyTrashed()->where('id', $id)->first();

            if ($productRoomMockup) {
                $productRoomMockup->restore();
                return back()->with('success', 'Data mockup room berhasil direstore');
            } else {
                return back()->with('error', 'Data mockup room tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $productRoomMockup = ProductRoomMockup::onlyTrashed()->restore();

            if ($productRoomMockup > 0) {
                return back()->with('success', 'Semua mockup room berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada mockup room yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $productRoomMockup = ProductRoomMockup::onlyTrashed()->where('id', $id)->first();

            if ($productRoomMockup) {
                if ($productRoomMockup->image) {
                    Storage::disk('public')->delete($productRoomMockup->image);
                    $productRoomMockup->forceDelete();
                }
                return back()->with('success', 'Data mockup room berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data mockup room tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
