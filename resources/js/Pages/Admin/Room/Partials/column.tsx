import { ColumnDef } from "@tanstack/react-table";
import { Rooms } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import DeleteData from "@/Components/DeleteData";
import { formatDate } from "@/lib/FormatDate";
import Edit from "../Edit";

export const columns: ColumnDef<Rooms>[] = [
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
                    Nama ruangan
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
                    className="size-32 md:size-32 rounded-lg object-contain"
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
        accessorKey: "product_room_mockups",
        header: "Jumlah Mockup",
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.product_room_mockups.length
                        ? row.original.product_room_mockups.length
                        : 0}{" "}
                </span>
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
            const room = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Edit room={room} />
                    <DeleteData paramId={`/admin/ruangan/${room.id}`} />
                </div>
            );
        },
    },
];
