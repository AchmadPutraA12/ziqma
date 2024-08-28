<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactAdmin;
use Illuminate\Http\Request;

class ContactAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contactCenter = ContactAdmin::first();
        return inertia(
            'Admin/ContactAdmin/Index',
            [
                'contactAdmin' => $contactCenter
            ]
        );
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
        $request->validate([
            'phone_number' => 'required',
        ], [
            'phone_number.required' => 'Nomor kontak center harus diisi',
        ]);

        $getContactCenter = ContactAdmin::find($id);

        if (!$getContactCenter) {
            return redirect()->back()->withErrors(['contact_center_not_found' => 'Contact Center tidak ditemukan']);
        }

        $getContactCenter->phone_number = $request->phone_number;
        $getContactCenter->save();

        return redirect()->back()->with('success', 'Contact center telah diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
