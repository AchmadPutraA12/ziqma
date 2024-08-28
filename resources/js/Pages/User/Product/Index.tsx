import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import ProductLayout from "@/Layouts/ProductLayout";
import { PageProps, Products } from "@/types";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link, router, usePage } from "@inertiajs/react";
import { Skeleton } from "@/Components/ui/skeleton";

interface Props {
    products?: Products[];
}

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function Index({ products }: Props) {
    console.log(products);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Products[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const { productCategory } = usePage<PageProps>().props;

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.reload({ only: ["products"] });
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (products) {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filtered);
            setSelectedIndex(-1);
        }
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target as Node)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            setSearchQuery(suggestions[selectedIndex].name);
            setSuggestions([]);
        }
    };

    const filteredProducts = suggestions.length > 0 ? suggestions : products;

    return (
        <div className="flex flex-col relative">
            <div className="flex flex-col gap-4">
                <h1 className="text-xl">Produk</h1>
                <div className="flex gap-2 items-center top-0 sticky z-20 bg-white rounded-xl mb-5 justify-between">
                    <div
                        ref={searchContainerRef}
                        className="relative w-full lg:w-52"
                    >
                        <Input
                            placeholder="Cari Produk"
                            className="w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        {searchQuery && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border rounded shadow-md mt-2">
                                {suggestions.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`p-2 hover:bg-gray-200 cursor-pointer ${index === selectedIndex
                                                ? "bg-gray-200"
                                                : ""
                                            }`}
                                        onClick={() => {
                                            setSearchQuery(item.name);
                                            setSuggestions([]);
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Select>
                        <SelectTrigger className="w-[35%] hidden">
                            <SelectValue placeholder="Kategori Produk" />
                        </SelectTrigger>
                        <SelectContent>
                            {productCategory.map((item) =>
                                item.sub_product_categories.map(
                                    (subItem, index) => (
                                        <SelectItem
                                            key={index}
                                            value={subItem.name}
                                        >
                                            <Link
                                                href={`/produk/${subItem.slug}`}
                                            >
                                                {subItem.name}
                                            </Link>
                                        </SelectItem>
                                    )
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {products === undefined ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div className="p-4 rounded-xl border" key={index}>
                            <div className="flex justify-center">
                                <Skeleton className="object-contain w-full h-40 md:size-48 lg:size-72 rounded-lg" />
                            </div>
                            <div className="flex flex-col mt-6 gap-2">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="w-20 h-5" />
                                </div>
                                <Skeleton className="w-40 h-5" />
                            </div>
                            <div className="flex items-center mt-8 gap-2">
                                <Skeleton className="w-full h-8" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-5">
                    {products.map((item) => (
                        <div className="p-4 rounded-xl border" key={item.id}>
                            <div className="flex justify-center">
                                <img
                                    className="object-contain w-full h-40 md:size-48 lg:size-72 rounded-lg"
                                    src={`/storage/${item.image}`}
                                    alt={item.name}
                                />
                            </div>
                            <div className="flex flex-col mt-6 gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm lg:text-2xl font-semibold">
                                        {item.name}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex text-sm lg:text-xl items-end">
                                        <FormatRupiah value={item.price} />
                                        <span className="text-sm">
                                            {item.type === 'box' ? '/ Box' : '/ Roll'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {item.has_mockups && (
                                <div className="flex items-center mt-8 gap-2">
                                    <Button className="w-full" asChild>
                                        <Link href={`/produk/${item.slug}/${item.id}`}>
                                            Detail Produk
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Index.layout = (page: any) => (
    <ProductLayout head="Produk">{page}</ProductLayout>
);
