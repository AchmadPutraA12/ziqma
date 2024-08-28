<?php

use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\CollaborationController;
use App\Http\Controllers\Admin\ContactAdminController;
use App\Http\Controllers\Admin\DashboardAdminControllerr;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\ProductColorController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductRoomMockupController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\SubProductCategoryController;
use App\Http\Controllers\Admin\TransactionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\CheckoutController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\ProductController as UserProductController;
use App\Http\Controllers\User\SubCategoryProductController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::resource('/', DashboardController::class)->names('user.dashboard');
Route::resource('/kategori-produk', SubCategoryProductController::class)->names('user.sub-category-product');
Route::resource('/produk', UserProductController::class)->names('user.product');
Route::get('/produk/{slug}/{id}', [UserProductController::class, 'ShowDetailProduct'])->name('user.ShowDetailProduct');
Route::resource('/keranjang', CartController::class)->names('user.cart');
Route::get('/checkout', [CheckoutController::class, 'download'])->name('user.checkout');

Route::middleware(['auth'])->group(function () {
    Route::resource('admin/dashboard', DashboardAdminControllerr::class)->names('admin.dashboard');
    Route::resource('admin/kategori-produk', ProductCategoryController::class)->names('admin.product-category');
    Route::resource('admin/sub-kategori-produk', SubProductCategoryController::class)->names('admin.sub-product-category');
    Route::resource('admin/produk', ProductController::class)->names('admin.product');
    Route::resource('admin/warna-produk', ProductColorController::class)->names('admin.product-color');
    Route::resource('admin/ruangan', RoomController::class)->names('admin.room');
    Route::resource('admin/produk-mockup', ProductRoomMockupController::class)->names('admin.product-room-mockup');
    Route::resource('admin/kolaborasi', CollaborationController::class)->names('admin.collaboration');
    Route::resource('admin/transaksi', TransactionController::class)->names('admin.transaction');
    Route::resource('admin/kontak-admin', ContactAdminController::class)->names('admin.contact-admin');
    Route::resource('admin/backup', BackupController::class)->names('admin.backup');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/kategori-produk/backup/{id}', [ProductCategoryController::class, 'restore'])->name('admin.product-category.restore');
    Route::get('/sub-kategori-produk/{id}', [SubProductCategoryController::class, 'restore'])->name('admin.sub-product-category.restore');
    Route::get('admin/produk-backup/{id}', [ProductController::class, 'restore'])->name('admin.product.restore');
    Route::get('/warna-produk/{id}', [ProductColorController::class, 'restore'])->name('admin.product-color.restore');
    Route::get('/ruangan/{id}', [RoomController::class, 'restore'])->name('admin.room.restore');
    Route::get('/produk-mockup/{id}', [ProductRoomMockupController::class, 'restore'])->name('admin.product-room-mockup.restore');
    Route::get('/kolaborasi/{id}', [CollaborationController::class, 'restore'])->name('admin.collaboration.restore');


    Route::get('/kategori-produk/delete/{id}', [ProductCategoryController::class, 'delete'])->name('admin.product-category.delete');
    Route::get('/sub-kategori-produk/delete/{id}', [SubProductCategoryController::class, 'delete'])->name('admin.sub-product-category.delete');
    Route::get('admin/produk/delete/{id}', [ProductController::class, 'delete'])->name('admin.product.delete');
    Route::get('/warna-produk/delete/{id}', [ProductColorController::class, 'delete'])->name('admin.product-color.delete');
    Route::get('/ruangan/delete/{id}', [RoomController::class, 'delete'])->name('admin.room.delete');
    Route::get('/produk-mockup/delete/{id}', [ProductRoomMockupController::class, 'delete'])->name('admin.product-room-mockup.delete');
    Route::get('/kolaborasi/delete/{id}', [CollaborationController::class, 'delete'])->name('admin.collaboration.delete');
});


require __DIR__ . '/auth.php';
