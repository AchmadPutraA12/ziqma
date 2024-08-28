<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Invoice</title>
    <link rel="stylesheet" href="{{ public_path('invoice.css') }}" type="text/css">
</head>

<body>
    <table class="table-no-border">
        <tr>
            <td class="width-70">
                <img src="{{ public_path('Logo/logo-transparant-2.png') }}" alt="" width="200" />
            </td>
            <td class="width-30">
                <h2>Invoice : {{ $dataUser['invoice'] }}</h2>
            </td>
        </tr>
    </table>

    <div class="margin-top">
        <table class="table-no-border">
            <tr>
                <td class="width-50">
                    <div><strong>Pemesan</strong></div>
                    <div>Nama : {{ $dataUser['name'] }}</div>
                    <div>Alamat : {{ $dataUser['phone'] }}</div>
                    @if ($dataUser['email'] != null)
                        <div>Email : {{ $dataUser['email'] }}</div>
                    @endif
                    @if ($dataUser['address'] != null)
                        <div>Alamat : {{ $dataUser['address'] }}</div>
                    @endif
                </td>
                <td class="width-50">
                    <div><strong>Kantor</strong></div>
                    <div>Ziqma Collection</div>
                    <div>Jl. Babatan Gg. Balai RW No.15E, Dukuh Sutorejo, Kec. Mulyorejo, Surabaya, Jawa Timur 60113
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div>
        <table class="product-table">
            <thead>
                <tr>
                    <th class="width-25">
                        <strong>Nama Produk</strong>
                    </th>
                    <th class="width-25">
                        <strong>Warna<strong>
                    </th>
                    <th class="width-50">
                        <strong>Harga/Box</strong>
                    </th>
                    <th class="width-25">
                        <strong>Total Box</strong>
                    </th>
                    <th class="width-25">
                        <strong>Total Harga</strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                @foreach ($dataProduct as $product)
                    <tr>
                        <td class="width-50">
                            {{ $product['nameProduct'] }}
                        </td>
                        <td class="width-25">
                            {{ $product['colorProduct'] }}
                        </td>
                        <td class="width-50">
                            Rp. {{ $product['priceBox'] }}
                        </td>
                        <td class="width-25">
                            {{ $product['totalBox'] }} {{ $product['type'] }}
                        </td>
                        <td class="width-50">
                            Rp. {{ $product['totalPrice'] }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td class="width-70" colspan="4">
                        <strong>Sub Total:</strong>
                    </td>
                    <td class="width-25">
                        <strong>Rp {{ number_format($dataUser['amount'], 0, ',', ',') }}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</body>

</html>
