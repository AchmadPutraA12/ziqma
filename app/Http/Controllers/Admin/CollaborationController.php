<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Collaboration;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use function Pest\Laravel\call;

class CollaborationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collaboration = Collaboration::all();
        return Inertia::render('Admin/Collaboration/Index', [
            'collaborations' => $collaboration
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Collaboration/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'image' => 'mimes:png,jpg,jpeg',
        ]);

        if ($request->file('image')) {
            $imageFile = $request->file('image');
            $filename = uniqid() . '.' . $imageFile->getClientOriginalName() . '.webp';
            $imagePath = 'collaboration-image/' . $filename;

            if (!Storage::disk('public')->exists('collaboration-image')) {
                Storage::disk('public')->makeDirectory('collaboration-image');
            }

            $manager = new ImageManager(new Driver());
            $image = $manager->read($imageFile->getRealPath());
            $image->scale(width: 300);
            $image->toWebp()->save(storage_path('app/public/' . $imagePath));

            $collaboration = Collaboration::create([
                'name' => $request->name,
                'image' => $imagePath
            ]);

            if ($collaboration) {
                return back()->with('success', 'data kolaborasi berhasil ditambahkan');
            } else {
                return back()->with('error', 'data kolaborasi gagal ditambahkan');
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $collaboration = Collaboration::find($id);

            if ($collaboration) {

                return Inertia::render('Admin/Collaboration/Show', [
                    'collaboration' => $collaboration
                ]);
            } else {
                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }
        } catch (\Throwable $th) {
            return back()->with('error', 'data kolaborasi tidak ditemukan');
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
                'name' => 'required',
                'image' => 'mimes:png,jpg,jpeg',
            ]);

            $collaboration = Collaboration::find($id);

            if (!$collaboration) {
                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }

            $collaboration->update([
                'name' => $request->name
            ]);

            if ($request->hasFile('image')) {
                if ($collaboration->image) {
                    Storage::disk('public')->delete($collaboration->image);
                }

                $imageFile = $request->file('image');
                $filename = uniqid() . '.' . $imageFile->getClientOriginalName() . '.webp';
                $imagePath = 'collaboration-image/' . $filename;

                if (!Storage::disk('public')->exists('collaboration-image')) {
                    Storage::disk('public')->makeDirectory('collaboration-image');
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($imageFile->getRealPath());
                $image->scale(width: 300);
                $image->toWebp()->save(storage_path('app/public/' . $imagePath));

                $collaboration->update([
                    'image' => $imagePath
                ]);
            }

            return back()->with('success', 'data kolaborasi berhasil diupdate');
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $collaboration = Collaboration::find($id);
            if ($collaboration) {
                $collaboration->delete();
                return back()->with('success', 'data kolaborasi berhasil dihapus');
            } else {
                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $collaboration = Collaboration::onlyTrashed()->find($id);
            if ($collaboration) {
                $collaboration->restore();
                return back()->with('success', 'data kolaborasi berhasil direstore');
            } else {
                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $collaboration = Collaboration::onlyTrashed()->restore();
            if ($collaboration) {
                return back()->with('success', 'semua data kolaborasi berhasil direstore');
            } else {

                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function delete($id)
    {

        try {
            $collaboration = Collaboration::onlyTrashed()->find($id);
            if ($collaboration) {
                if ($collaboration->image) {
                    Storage::disk('public')->delete($collaboration->image);
                    $collaboration->forceDelete();
                }
                return back()->with('success', 'data kolaborasi berhasil di hapus permanen');
            } else {
                return back()->with('error', 'data kolaborasi tidak ditemukan');
            }
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
