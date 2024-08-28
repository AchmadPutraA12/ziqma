import NavbarAdmin from "@/Components/NavbarAdmin";
import Toastify from "@/Components/Toastify";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
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
    SquareGanttChartIcon,
    PackageOpen,
    Image,
    DoorOpen,
    ImagesIcon,
    Headphones,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import LogoAdmin from "../../../public/Logo/logo-transparant-2.png";
import LogoAdmin2 from "../../../public/Logo/logo-transparant-3.png";
import { Input } from "@/Components/ui/input";

interface Props {
    head: string;
    tittleHead?: string;
    tittleDesc?: string;
    children: React.ReactNode;
}
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
export default function AdminLayout({
    head,
    tittleHead,
    tittleDesc,
    children,
}: Props) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash && flash?.error) {
            toast.error(flash.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (flash && flash?.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [flash]);
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const [handleSmallScreen, setHandleSmallScreen] = useState(() => {
        const storedValue = localStorage.getItem("handleSmallScreen");
        return storedValue ? JSON.parse(storedValue) : true;
    });
    useEffect(() => {
        localStorage.setItem(
            "handleSmallScreen",
            JSON.stringify(handleSmallScreen)
        );
    }, [handleSmallScreen]);
    return (
        <>
            <Head title={"admin - " + head} />
            <NavbarAdmin />
            <aside
                className={` p-4 hidden z-[100] border-r-2 lg:z-10 lg:flex  flex-col top-0 gap-4 h-screen fixed left-0 bg-gray-950  ${
                    handleSmallScreen ? "w-64" : "w-24"
                }`}
            >
                <div className="flex items-center justify-center rounded-xl relative">
                    <img
                        src={LogoAdmin}
                        className={`w-[90%]  ${
                            handleSmallScreen ? "visible" : "hidden"
                        }`}
                        alt=""
                    />
                    <img
                        src={LogoAdmin2}
                        className={`size-10 m-4 ${
                            handleSmallScreen ? "hidden" : "block"
                        }`}
                        alt=""
                    />
                    <button
                        onClick={() => setHandleSmallScreen(!handleSmallScreen)}
                    >
                        <ChevronLeft
                            className={`bg-yellow-300 hover:scale-125 hover:border-[4.5px] transform duration-300 rounded-full size-8 top-0 -right-[29px] border-2 border-black absolute ${
                                handleSmallScreen ? "" : "rotate-180"
                            }`}
                        />
                    </button>
                </div>
                <div className="relative mb-1">
                    <Search className="absolute top-2.5 left-1.5 size-5 text-gray-500" />
                    <Input
                        type="search"
                        placeholder="Cari..."
                        className="pl-8 border text-gray-black border-zinc-400 placeholder:text-gray-500"
                        value={searchTerm}
                        onChange={handleSearch}
                        onClick={() =>
                            !handleSmallScreen &&
                            setHandleSmallScreen(!handleSmallScreen)
                        }
                    />
                </div>

                <span
                    className={`text-gray-400 text-xs ${
                        handleSmallScreen ? null : "text-center"
                    }
            `}
                >
                    Navigasi
                </span>
                <ul
                    className={`
            flex flex-col gap-1.5 text-sm font-medium  overflow-y-auto h-4/5 scroll-me-12 ${
                handleSmallScreen ? null : "items-center"
            }
        `}
                >
                    {sidebarItems.map((item, index) =>
                        item.separator ? (
                            <li
                                key={index}
                                className="my-1 border-t mt-2  flex border-gray-300"
                            >
                                <span className="text-gray-400 mt-4 text-xs ">
                                    {item.label}
                                </span>
                            </li>
                        ) : (
                            // Sidebar item
                            <li key={index}>
                                <Link
                                    key={index}
                                    href={`${item.href}`}
                                    className={`flex items-center gap-2 p-2 rounded-lg  transform duration-100 ${
                                        window.location.pathname === item.href
                                            ? "bg-yellow-300 font-semibold"
                                            : "text-gray-400 hover:bg-gray-700 hover:text-yellow-300"
                                    }`}
                                >
                                    {handleSmallScreen ? (
                                        <div>{item.icon}</div>
                                    ) : (
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    {item.icon}
                                                </TooltipTrigger>
                                                <TooltipContent className="text-xs font-semibold ml-10 bg-yellow-300 border-none text-black">
                                                    <p>{item.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}

                                    <span
                                        className={` text-xs ${
                                            handleSmallScreen
                                                ? "block"
                                                : "hidden"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </aside>
            {flash?.success && <Toastify />}
            {flash?.error && <Toastify />}
            <div
                className={`mt-28 mx-4 md:mx-0 md:px-8 pb-16 ${
                    handleSmallScreen ? "lg:ml-64" : "lg:ml-28"
                }`}
            >
                <div className="flex flex-col gap-1">
                    <span className=" text-xl md:text-2xl lg:text-4xl font-bold">
                        {tittleHead}
                    </span>
                    <span className="text-gray-500 text-sm md:text-lg font-medium">
                        {tittleDesc}
                    </span>
                </div>
                {children}
            </div>
        </>
    );
}
