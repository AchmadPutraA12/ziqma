import { Link, usePage } from "@inertiajs/react";
import ApplicationLogo from "../ApplicationLogo";
import Logo from "../../../../public/Logo/logo-transparant.png";
import { PageProps } from "@/types";
const Footer = () => {
    const { contact } = usePage<PageProps>().props;
    return (
        <footer className=" w-full items-center bg-black/[0.98] flex flex-col gap-2 lg:pt-16">
            <img src={Logo} className="w-32" alt="" />
            <div className="flex font-semibold text-white gap-5 mt-2   p-4 text-xs md:text-sm lg:text-lg">
                <Link
                    as="button"
                    className="hover:underline hover:text-blue-500"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    as="button"
                    href="/"
                    className="hover:underline hover:text-blue-500"
                >
                    Produk
                </Link>
            </div>
            <span className=" text-center lg:max-w-4xl text-zinc-200 text-xs mt-3 leading-6 mx-6 md:text-sm lg:text-lg lg:mx-40">
                Temukan produk impianmu di Ziqma Collection, tempat di mana
                impian bertemu realitas. Wujudkan aspirasi dan keinginanmu
                dengan koleksi produk terbaik yang kami tawarkan. Mulailah
                perjalananmu menuju impian yang nyata dengan Ziqma Collection.
            </span>

            <div className="flex gap-6 text-zinc-300 lg:gap-10 mt-4 lg:my-8">
                <a target="_blank" href={`https://wa.me/${contact.phone_number}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 lg:w-8 lg:h-8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                        ></path>
                    </svg>
                </a>

                <Link
                    href={"https://www.tokopedia.com/ziqmacollection"}
                    target="_blank"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 lg:w-8 lg:h-8"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M7.5 5.5a4.5 4.5 0 0 1 9 0V7H21v16H3V7h4.5zm0 3.5H5v12h14V9h-2.5v3h-2V9h-5v3h-2zm7-2V5.5a2.5 2.5 0 0 0-5 0V7z"
                        ></path>
                    </svg>
                </Link>
            </div>
            <div className="flex w-full justify-between items-center mt-5">
                <span className=" w-1/3 bg-black h-12 rounded-tr-full"></span>
                <span className=" text-xs text-center text-gray-300">
                    Copyright © 2024, ZIQMA COLLECTION
                </span>
                <span className=" w-1/3 bg-black h-12 rounded-tl-full"></span>
            </div>
        </footer>
    );
};

export default Footer;
