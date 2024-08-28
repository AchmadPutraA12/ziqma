import React, { useEffect } from "react";
import Logo from "../../../../public/Logo/logo-transparant-2.png";
import { Menu, ShoppingCart } from "lucide-react";
import { Link } from "@inertiajs/react";
import useLocalStorage from "use-local-storage";
import { Products } from "@/types";
const Navbar = () => {
    return (
        <nav className="w-full z-50 py-2 bg-[#09090C] px-2 md:px-8 lg:px-16 flex items-center justify-between top-0 fixed">
            <Link href="/">
                {" "}
                <img src={Logo} alt="logo" className=" w-44 lg:w-52" />
            </Link>

            <ul className="hidden text-gray-300 md:flex items-center gap-8 mr-12">
                {" "}
                <li className="flex flex-col relative">
                    <Link
                        href="/"
                        className={`${
                            window.location.pathname === "/"
                                ? "text-yellow-300 font-medium"
                                : null
                        }`}
                    >
                        Home
                    </Link>
                    {window.location.pathname === "/" ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-yellow-300"></div>
                    ) : null}
                </li>
                <li className="flex flex-col relative">
                    <Link
                        href="/produk"
                        className={`${
                            window.location.pathname.startsWith("/produk")
                                ? "text-yellow-300 font-medium"
                                : null
                        }`}
                    >
                        Produk
                    </Link>
                    {window.location.pathname.startsWith("/produk") ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-yellow-300"></div>
                    ) : null}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
