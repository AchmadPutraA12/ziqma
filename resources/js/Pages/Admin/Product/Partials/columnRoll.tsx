import { ColumnDef } from "@tanstack/react-table";
import { Products } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import DeleteData from "@/Components/DeleteData";
import { formatDate } from "@/lib/FormatDate";
import Edit from "../Edit";
import { FormatRupiah } from "@arismun/format-rupiah";

export const columnsRoll: ColumnDef<Products>[] = [
    {
        id: "No",
        header: "No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        enableHiding: false,
        sortUndefined: false,
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
        accessorKey: "thickness",
        header: "Ketebalan",
        cell: ({ row }) => {
            return <span>{row.getValue("thickness")}</span>;
        },
    },
    {
        accessorKey: "range",
        header: "Jangkauan area",
        cell: ({ row }) => {
            return <span>{row.getValue("range")} m2</span>;
        },
    },
    {
        accessorKey: "width",
        header: "Lebar",
        cell: ({ row }) => {
            return <span>{row.getValue("width")} m</span>;
        },
    },
    {
        accessorKey: "height",
        header: "Panjang",
        cell: ({ row }) => {
            return <span>{row.getValue("height")} m</span>;
        },
    },
    {
        accessorKey: "price",
        header: "Harga/roll",
        cell: ({ row }) => {
            return <FormatRupiah value={row.getValue("price")} />;
        },
    },
    {
        accessorKey: "price_per_square_meter",
        header: "Harga/m2",
        cell: ({ row }) => {
            return (
                <FormatRupiah value={row.getValue("price_per_square_meter")} />
            );
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
            const product = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Edit product={product} />{" "}
                    <DeleteData paramId={`/admin/produk/${product.id}`} />
                </div>
            );
        },
    },
];
