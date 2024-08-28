import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/Components/ui/sheet";
import LogoAdmin from "../../../public/Logo/logo-transparant-2.png";
import {
    DoorOpen,
    Headphones,
    Image,
    ImagesIcon,
    LogOut,
    Menu,
    SquareGanttChartIcon,
} from "lucide-react";
import {
    Search,
    LayoutDashboardIcon,
    SquareGanttChart,
    Package,
    FileBadge2,
    Banknote,
    User,
    DatabaseBackupIcon,
    ChevronLeft,
} from "lucide-react";
const sidebarItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboardIcon size={20} />,
    },
    {
        label: "Transaksi",
        href: "/admin/transaksi",
        icon: <Banknote size={20} />,
    },
    { separator: true, label: "Produk" },
    {
        label: "Kategori Produk",
        href: "/admin/kategori-produk",
        icon: <SquareGanttChart size={20} />,
    },
    {
        label: "Sub Kategori Produk",
        href: "/admin/sub-kategori-produk",
        icon: <SquareGanttChartIcon size={20} />,
    },
    { label: "Produk", href: "/admin/produk", icon: <Package size={20} /> },
    {
        label: "Warna Produk",
        href: "/admin/warna-produk",
        icon: <Image size={20} />,
    },
    {
        label: "Ruangan",
        href: "/admin/ruangan",
        icon: <DoorOpen size={20} />,
    },
    {
        label: "Produk dan Mockup",
        href: "/admin/produk-mockup",
        icon: <ImagesIcon size={20} />,
    },

    { separator: true, label: "Pengaturan" },
    {
        label: "Kolaborasi",
        href: "/admin/kolaborasi",
        icon: <FileBadge2 size={20} />,
    },
    {
        label: "Kontak Admin",
        href: "/admin/kontak-admin",
        icon: <Headphones size={20} />,
    },
    {
        label: "Backup",
        href: "/admin/backup",
        icon: <DatabaseBackupIcon size={20} />,
    },
];

import { useState } from "react";
const NavbarAdmin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const user = usePage<PageProps>().props.auth.user;

    return (
        <nav className=" w-full h-20 z-[100] lg:z-10  bg-gray-900 lg:bg-gray-50 items-center top-0 fixed flex p-4 justify-between lg:justify-end">
            <div className="flex items-center gap-1 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button>
                            <Menu className="w-6 h-6 text-gray-400" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        className=" bg-gray-900 border-none pt-24  flex flex-col gap-1.5 text-sm font-medium  overflow-y-auto h-[100vh] scroll-me-12"
                        side={"left"}
                    >
                        <div className="relative mb-4">
                            <Search className="absolute top-2.5 left-1.5 size-5 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Cari..."
                                className="pl-8 bg-gray-800/75 border-none text-gray-200 placeholder:text-gray-500"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <hr className="my-4 bg-gray-700 h-[1px] border-none" />
                        <ul
                            className={`
            flex flex-col gap-3 text-sm font-medium`}
                        >
                            {sidebarItems
                                .filter((item) =>
                                    item.label
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase())
                                )
                                .map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            key={index}
                                            href={`${item.href}`}
                                            className={`flex items-center gap-2 p-2 rounded-lg  transform duration-100 ${window.location.pathname ===
                                                    item.href
                                                    ? "bg-yellow-300 font-semibold"
                                                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300"
                                                }`}
                                        >
                                            {" "}
                                            <div>{item.icon}</div>
                                            <span>{item.label}</span>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </SheetContent>
                </Sheet>

                <img src={LogoAdmin} className="w-44" alt="" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className=" items-center gap-3  cursor-pointer flex">
                        <img
                            className="w-9 h-9 rounded-full"
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`}
                            alt=""
                        />
                        <div className=" flex-col w-auto hidden md:flex">
                            <span className=" text-sm font-semibold line-clamp-1 text-white lg:text-black">
                                {user.name}
                            </span>
                            <span className="text-xs font-medium text-gray-400 ">
                                {user.email}
                            </span>
                        </div>
                        <svg
                            className="hidden md:block ml-2 text-white lg:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m7 10l5 5m0 0l5-5"
                            ></path>
                        </svg>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-white z-[110]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href="/profile">
                            <DropdownMenuItem className=" cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Link href={route("logout")} method="post">
                        <DropdownMenuItem className=" cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};

export default NavbarAdmin;
