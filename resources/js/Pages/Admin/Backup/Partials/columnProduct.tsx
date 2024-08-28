import { ColumnDef } from "@tanstack/react-table";
import { Products } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib/FormatDate";
import { Link } from "@inertiajs/react";
import DeleteDataPermanent from "@/Components/DeleteDataPermanent";

export const columnProduct: ColumnDef<Products>[] = [
    {
        id: "No",
        header: "No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        enableHiding: false,
        sortUndefined: false,
    },
    {
        accessorKey: "sub_product_category.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Sub kategori produk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <span className=" bg-yellow-200 rounded-lg px-4 py-1">
                    {row.original.sub_product_category.name}
                </span>
            );
        },
    },

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        sortingFn: "text",
    },
    {
        accessorKey: "image",
        header: "Gambar",
        cell: ({ row }) => {
            return (
                <img
                    className="size-32 md:size-20 rounded-lg object-contain"
                    src={
                        window.location.origin +
                        "/storage/" +
                        row.getValue("image")
                    }
                    alt=""
                />
            );
        },
    },

    {
        accessorKey: "type",
        header: "Tipe",
        cell: ({ row }) => {
            return <span>{row.getValue("type")}</span>;
        },
    },

    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <span>{formatDate(row.getValue("created_at"))}</span>;
        },
    },

    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const product_category = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Link
                        preserveScroll
                        preserveState
                        className="text-xs font-semibold bg-green-100 border border-green-500 px-4 py-2 rounded-md text-green-500  hover:bg-green-200 hover:text-gray-white hover:border-gray-400"
                        type="button"
                        method="get"
                        href={route(
                            "admin.product.restore",
                            product_category.id
                        )}
                    >
                        Restore
                    </Link>
                    <DeleteDataPermanent
                        paramLink="admin.product.delete"
                        id={product_category.id}
                    />
                </div>
            );
        },
    },
];
