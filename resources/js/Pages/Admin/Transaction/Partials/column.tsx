import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types";
import { Button } from "@/Components/ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/FormatDate";
import { Link, router } from "@inertiajs/react";
import { FormatRupiah } from "@arismun/format-rupiah";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import React from "react";
export const columns: ColumnDef<Transaction>[] = [
    {
        id: "No",
        header: "No",
        cell: (info) => info.row.index + 1,
        enableSorting: false,
        enableHiding: false,
        sortUndefined: false,
    },
    {
        accessorKey: "invoice",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Invoice
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        sortingFn: "text",
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
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Sub Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell(props) {
            return <FormatRupiah value={props.getValue<number>()} />;
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
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
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    size={"sm"}
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell(props) {
            const [position, setPosition] = React.useState<any>(
                props.row.getValue("status")
            );

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className={` flex items-center justify-center px-4 py-2 gap-2 hover:text-white ${
                                    props.row.getValue("status") === "pending"
                                        ? "bg-yellow-600 text-white hover:bg-yellow-700 "
                                        : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                                variant="outline"
                            >
                                {props.row.getValue("status")}
                                <ChevronDown className="mt-1" size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={position}
                                onValueChange={setPosition}
                                className="text-xs"
                            >
                                <DropdownMenuRadioItem
                                    value="pending"
                                    onClick={() =>
                                        router.patch(
                                            `/admin/transaksi/${props.row.original.id}`,
                                            {
                                                status: "pending",
                                            },
                                            {
                                                preserveScroll: true,
                                            }
                                        )
                                    }
                                >
                                    Pending
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem
                                    value="selesai"
                                    onClick={() =>
                                        router.patch(
                                            `/admin/transaksi/${props.row.original.id}`,
                                            {
                                                status: "selesai",
                                            },
                                            {
                                                preserveScroll: true,
                                            }
                                        )
                                    }
                                >
                                    Selesai
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const sub_category_produk = row.original;

            return (
                <div className="flex items-center gap-2">
                    <Button variant="default" size={"sm"} asChild>
                        <Link
                            className="text-xs"
                            href={route(
                                "admin.transaction.show",
                                sub_category_produk.invoice
                            )}
                        >
                            Detail
                        </Link>
                    </Button>
                </div>
            );
        },
    },
];
