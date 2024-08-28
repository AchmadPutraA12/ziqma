<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use function Pest\Laravel\call;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $room = Room::with('productRoomMockups')->get();
        return Inertia::render(
            'Admin/Room/Index',
            [
                'rooms' => $room
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return  Inertia::render('Admin/Room/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:rooms',
            'image' => 'mimes:png,jpg,jpeg',
        ]);



        if ($request->file('image')) {
            $foto = $request->file('image');
            $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
            $path = 'room-image/' . $filename;

            if (!Storage::disk('public')->exists('room-image')) {
                Storage::disk('public')->makeDirectory('room-image');
            }

            $manager = new ImageManager(new Driver());
            $image = $manager->read($foto->getRealPath());
            $image->toWebp()->save(storage_path('app/public/' . $path));

            $room = Room::create([
                'name' => $request->name,
                'image' => $path
            ]);
        }

        if ($room) {
            return back()->with('success', 'data ruangan berhasil ditambahkan');
        } else {
            return back()->with('error', 'data ruangan gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $room = Room::find($id);

            if ($room) {
                return Inertia::render('Admin/Room/Show', [
                    'room' => $room
                ]);
            } else {
                return back()->with('error', 'Data ruangan tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
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
                'name' => 'required|unique:rooms,name,' . $id,
            ]);

            $room = Room::find($id);

            if (!$room) {
                return back()->with('error', 'Data ruangan tidak ditemukan');
            }

            $room->update([
                'name' => $request->name
            ]);

            if ($request->hasFile('image')) {
                if ($room->image) {
                    Storage::disk('public')->delete($room->image);
                }

                $foto = $request->file('image');
                $filename = uniqid() . '.' . $foto->getClientOriginalName() . '.webp';
                $path = 'room-image/' . $filename;

                if (!Storage::disk('public')->exists('room-image')) {
                    Storage::disk('public')->makeDirectory('room-image');
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($foto->getRealPath());
                $image->toWebp()->save(storage_path('app/public/' . $path));

                $room->update(['image' => $path]);
            }

            return back()->with('success', 'Data ruangan berhasil diubah');
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
            $room = Room::find($id);

            if ($room->productRoomMockups->count() > 0) {
                return back()->with('error', 'Data ruangan tidak dapat di hapus');
            }

            $room->delete();

            return back()->with('success', 'Data ruangan berhasil di hapus');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $room = Room::onlyTrashed()->where('id', $id)->first();

            if ($room) {
                $room->restore();
                return back()->with('success', 'Data ruangan berhasil direstore');
            } else {
                return back()->with('error', 'Data ruangan tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $room = Room::onlyTrashed()->restore();

            if ($room > 0) {
                return back()->with('success', 'Semua ruangan berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada ruangan yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $room = Room::onlyTrashed()->where('id', $id)->first();

            if ($room) {
                if ($room->image) {
                    Storage::disk('public')->delete($room->image);
                    $room->forceDelete();
                }
                return back()->with('success', 'Data ruangan berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data ruangan tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
