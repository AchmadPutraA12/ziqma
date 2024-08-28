<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionDetails;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{

    public function download(Request $request)
    {
        $invoice = mt_rand(1000000, 9999999);

        $transaction = Transaction::create([
            'invoice' => 'INV-' . $invoice,
            'name' => $request->name,
            'email' => $request->email,
            'no_telp' => $request->phone,
            'address' => $request->address,
            'amount' => $request->amount,
        ]);

        if ($request->has('cart')) {
            foreach ($request->cart as $product) {
                TransactionDetails::create([
                    'transaction_id' => $transaction->id,
                    'color_product' => $product['colorProduct'],
                    'name_product' => $product['nameProduct'],
                    'total' => $product['totalBox'],
                    'total_price' => $product['totalPrice'],
                ]);
            }
        } else {
            TransactionDetails::create([
                'transaction_id' => $transaction->id,
                'color_product' => $request->colorProduct,
                'name_product' => $request->nameProduct,
                'total' => $request->totalBox,
                'total_price' => $request->totalPrice,
            ]);
        }

        $dataUser = [
            'invoice' => 'INV-' . $invoice,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'amount' => $request->amount,
        ];

        $dataProduct = $request->has('cart') ? $request->cart : [
            [
                'type' => $request->type,
                'colorProduct' => $request->colorProduct,
                'nameProduct' => $request->nameProduct,
                'totalBox' => $request->totalBox,
                'priceBox' => number_format($request->priceBox),
                'totalPrice' => number_format($request->totalPrice),
            ]
        ];

        $pdf = PDF::loadView('pdf', ['dataProduct' => $dataProduct, 'dataUser' => $dataUser]);

        return $pdf->download('INV-' . $invoice . '-ziqmacollection.pdf');
    }
}
