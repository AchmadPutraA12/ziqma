import AdminLayout from "@/Layouts/AdminLayout";
import { Transaction } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { FormatRupiah } from "@arismun/format-rupiah";

interface Props {
    transaction: Transaction;
}

const Index = ({ transaction }: Props) => {
    return (
        <AdminLayout
            head="transaksi"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        transaksi dengan lebih efisien."
            tittleHead="Manajemen Transaksi"
        >
            <div>
                <Link
                    href="/admin/transaksi"
                    className="flex underline mt-4 items-center gap-2"
                >
                    <ChevronLeft />
                    <span>Kembali</span>
                </Link>
                <div className="w-full mt-6 bg-yellow-300 p-2 pl-4">
                    <span className="font-semibold">Customer</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl">
                    <div className="flex flex-col gap-1">
                        <span className="text-lg font-medium">
                            {transaction.name}
                        </span>
                        <span className="text-sm ">{transaction.email}</span>
                        <span className="text-sm ">{transaction.no_telp}</span>
                        <span className="text-sm ">{transaction.address}</span>
                    </div>
                </div>
                <div className="w-full mt-4 bg-yellow-300 p-2 pl-4">
                    <span className="font-semibold">Detail Transaksi</span>
                </div>
                <ul className="list-decimal gap-4 p-4 rounded-xl">
                    {transaction.transaction_details.map(
                        (transaction_detail) => (
                            <li
                                key={transaction_detail.id}
                                className="flex justify-between items-center gap-1"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-medium">
                                        {transaction_detail.name_product}
                                    </span>
                                    <span>-</span>
                                    <span className="text-lg font-medium">
                                        {transaction_detail.color_product}
                                    </span>
                                </div>

                                <span className="">
                                    {transaction_detail.total}/Box
                                </span>
                                <span className="">
                                    <FormatRupiah
                                        value={transaction_detail.total}
                                    />
                                </span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </AdminLayout>
    );
};

export default Index;
