import { ColumnDef } from "@tanstack/react-table";
import { Collaboration } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown, InfoIcon } from "lucide-react";
import DeleteData from "@/Components/DeleteData";
import { formatDate } from "@/lib/FormatDate";
import { Link } from "@inertiajs/react";
import Edit from "../Edit";

export const columns: ColumnDef<Collaboration>[] = [
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
                    className="size-20 rounded-lg object-cover"
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
            const collaboration = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Edit collaboration={collaboration} />
                    <DeleteData
                        paramId={`/admin/kolaborasi/${collaboration.id}`}
                    />
                </div>
            );
        },
    },
];
