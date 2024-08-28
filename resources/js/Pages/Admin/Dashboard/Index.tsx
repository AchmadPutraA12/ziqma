import { Input } from "@/Components/ui/input";
import AdminLayout from "@/Layouts/AdminLayout";
import { LaravelVisit, PageProps, Transaction } from "@/types";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link, usePage } from "@inertiajs/react";
import { Banknote, ChevronRight, Package, Users2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    transaction: Transaction[];
    laravelVisit: any[];
}

const Index = ({ transaction, laravelVisit }: Props) => {
    const [profitTotal, setProfitTotal] = useState<number>(0);
    const [profitDateTotal, setProfitDateTotal] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [startDateVisit, setStartDateVisit] = useState<string>("");
    const [endDateVisit, setEndDateVisit] = useState<string>("");
    const [filteredVisits, setFilteredVisits] =
        useState<LaravelVisit[]>(laravelVisit);

    const filterItemsByDate = <T extends { created_at: string }>(
        items: T[],
        start: string,
        end: string
    ): T[] => {
        const startTimestamp = new Date(start).getTime();
        const endTimestamp = new Date(end).getTime();
        return items.filter((item) => {
            const itemTimestamp = new Date(item.created_at).getTime();
            return (
                itemTimestamp >= startTimestamp && itemTimestamp <= endTimestamp
            );
        });
    };

    useEffect(() => {
        const totalProfit = transaction
            .filter((item) => item.status === "selesai")
            .reduce((total, item) => total + item.amount, 0);
        setProfitDateTotal(totalProfit);
    }, [transaction]);

    useEffect(() => {
        const filteredTransactions =
            startDate && endDate
                ? filterItemsByDate(transaction, startDate, endDate)
                : transaction;
        const totalProfit = filteredTransactions
            .filter((item) => item.status === "selesai")
            .reduce((total, item) => total + item.amount, 0);
        setProfitTotal(totalProfit);
    }, [transaction, startDate, endDate]);

    useEffect(() => {
        const filteredVisits =
            startDateVisit && endDateVisit
                ? filterItemsByDate(laravelVisit, startDateVisit, endDateVisit)
                : laravelVisit;
        setFilteredVisits(filteredVisits);
    }, [laravelVisit, startDateVisit, endDateVisit]);

    const {
        productCategories,
        subProductCategories,
        product,
        productColor,
        rooms,
        productWithProductColor,
        collaborations,
    } = usePage<PageProps>().props;
    return (
        <AdminLayout
            head="dashboard"
            tittleDesc="Terhubung dengan berbagai fitur dan pengaturan untuk
                    mengelola situs ini dengan lebih efisien."
            tittleHead="Dashboard"
        >
            <div className="gap-4 mt-3 w-full flex-col  md:flex-row flex 5 rounded-md shadow-sm">
                <div className="flex flex-col gap-2 p-4 lg:w-1/2 bg-zinc-200">
                    <Banknote className="size-8" />
                    <span className="text-sm md:text-lg font-medium">
                        Total Pendapatan
                    </span>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                        <span className="text-base md:text-2xl font-bold">
                            <FormatRupiah value={profitDateTotal} />
                        </span>
                        <Link
                            href="/admin/transaksi"
                            className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                        >
                            <span className="text-sm font-medium">detail</span>
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4 lg:w-1/2 bg-zinc-200">
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span>-</span>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <span className="text-base mt-4 md:text-2xl font-bold">
                        <FormatRupiah value={profitTotal} />
                    </span>
                </div>
            </div>
            <div className="gap-4 mt-3 flex-col  md:flex-row w-full flex 5 rounded-md shadow-sm">
                <div className="flex flex-col gap-2 p-4 lg:w-1/2 bg-zinc-200">
                    <Users2Icon className="size-8" />
                    <span className="text-sm md:text-lg font-medium">
                        Total Pengunjung
                    </span>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                        <span className="text-base md:text-2xl font-bold">
                            {laravelVisit.length}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 p-4 lg:w-1/2 bg-zinc-200">
                    <div className="flex items-center gap-2">
                        <Input
                            type="date"
                            value={startDateVisit}
                            onChange={(e) => setStartDateVisit(e.target.value)}
                        />
                        <span>-</span>
                        <Input
                            type="date"
                            value={endDateVisit}
                            onChange={(e) => setEndDateVisit(e.target.value)}
                        />
                    </div>
                    <span className="text-base mt-4 md:text-2xl font-bold">
                        {filteredVisits.length}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
                <div className="border-s-4 bg-gray-100/80 border-green-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Kategori Produk
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {productCategories.length}
                            </span>
                            <Link
                                href="/admin/kategori-produk"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-s-4 bg-gray-100/80 border-red-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Sub Kategori Produk
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {subProductCategories.length}
                            </span>
                            <Link
                                href="/admin/sub-kategori-produk"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-s-4 bg-gray-100/80 border-blue-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Produk
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {product.length}
                            </span>
                            <Link
                                href="/admin/produk"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
                <div className="border-s-4 bg-gray-100/80 border-amber-500 w-full bg-gray-50/65/65 rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Banknote className="size-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Warna Produk
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {productColor.length}
                            </span>
                            <Link
                                href="/admin/warna-produk"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-s-4 bg-gray-100/80 border-green-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Ruangan
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {rooms.length}
                            </span>
                            <Link
                                href="/admin/ruangan"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-s-4 bg-gray-100/80 border-red-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Produk dan Mockup
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {productWithProductColor.length}
                            </span>
                            <Link
                                href="/admin/produk-mockup"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-s-4 bg-gray-100/80 border-blue-500 w-full rounded-md shadow-sm">
                    <div className="flex flex-col gap-2 p-4">
                        <Package className="w-8 h-8" />
                        <span className="text-sm md:text-lg font-medium">
                            Kolaborasi
                        </span>
                        <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
                            <span className="text-base md:text-2xl font-bold">
                                {collaborations.length}
                            </span>
                            <Link
                                href="/admin/kolaborasi"
                                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
                            >
                                <span className="text-sm font-medium">
                                    detail
                                </span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
