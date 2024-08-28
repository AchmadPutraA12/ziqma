import { ColumnDef } from "@tanstack/react-table";
import { ProductCategory } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib/FormatDate";
import { Link } from "@inertiajs/react";
import DeleteDataPermanent from "@/Components/DeleteDataPermanent";

export const columnProductCategory: ColumnDef<ProductCategory>[] = [
    {
        id: "No",
        header: "No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        enableHiding: false,
        sortUndefined: false,
    },

    {
        id: "name",
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
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tanggal Dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <span>{formatDate(row.getValue("created_at"))}</span>;
        },
        sortingFn: "text",
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
                            "admin.product-category.restore",
                            product_category.id
                        )}
                    >
                        Restore
                    </Link>
                    <DeleteDataPermanent
                        paramLink="admin.product-category.delete"
                        id={product_category.id}
                    />
                </div>
            );
        },
    },
];
