import { ColumnDef } from "@tanstack/react-table";
import { ProductCategory } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Edit from "../Edit";
import DeleteData from "@/Components/DeleteData";
import { formatDate } from "@/lib/FormatDate";

export const columns: ColumnDef<ProductCategory>[] = [
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
                    <ArrowUpDown className=" h-4 w-4" />
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
                    <ArrowUpDown className=" h-4 w-4" />
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
                    <Edit category_product={product_category} />
                    <DeleteData
                        paramId={`/admin/kategori-produk/${product_category.id}`}
                    />
                </div>
            );
        },
    },
];
