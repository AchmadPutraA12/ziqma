<?php

namespace App\Http\Middleware;

use App\Models\Collaboration;
use App\Models\ContactAdmin;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductColor;
use App\Models\Room;
use App\Models\SubProductCategory;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()
            ],
            'flash' => [
                'error' => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],
            'productCategories' => fn () => ProductCategory::all(),
            'subProductCategories' => fn () => SubProductCategory::all(),
            'productColor' => fn () => ProductColor::all(),
            'product' => fn () => Product::orderBy('name', 'asc')->get(),
            'rooms' => fn () => Room::orderBy('name', 'asc')->get(),
            'productWithProductColor' => fn () => Product::with('productColors')->orderBy('name', 'asc')->get(),
            'collaborations' => fn () => Collaboration::orderBy('name', 'asc')->get(),
            'productCategory' => fn () => ProductCategory::with('subProductCategories')->get(),
            'contact' => fn () => ContactAdmin::first(),
        ]);
    }
}
