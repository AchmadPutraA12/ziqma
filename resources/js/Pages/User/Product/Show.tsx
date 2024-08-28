import { Button } from "@/Components/ui/button";
import ProductLayout from "@/Layouts/ProductLayout";
import { Products, SubProductCategory } from "@/types";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Check, ShoppingBag } from "lucide-react";
import NoData from "../../../../../public/img/no-data.png";
import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
interface ShowProps {
    subCategoryProduct: SubProductCategory;
}
const Show = ({ subCategoryProduct }: ShowProps) => {
    const [cart, setCart] = useLocalStorage<Products[]>(
        "cartZiqmaCollection",
        []
    );
    const [addedProducts, setAddedProducts] = useState<number[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartZiqmaCollection");
        if (storedCart) {
            const parsedCart: Products[] = JSON.parse(storedCart);
            const productIds = parsedCart.map((product) => product.id);
            setAddedProducts(productIds as any);
        }
    }, []);

    const addToCart = (product: Products) => {
        if (cart.length < 10) {
            if (!cart.find((item) => item.id === product.id)) {
                const updatedCart = [...cart, product];
                setCart(updatedCart);
                const updatedAddedProducts = [...addedProducts, product.id];
                setAddedProducts(updatedAddedProducts as any);
                localStorage.setItem(
                    "cartZiqmaCollection",
                    JSON.stringify(updatedCart)
                );
            } else {
                alert("Produk sudah ada di keranjang!");
            }
        } else {
            alert("Keranjang sudah penuh (maksimal 10 produk)!");
        }
    };
    return (
        <div className="flex flex-col relative">
            <div
                className={`grid gap-5 ${
                    subCategoryProduct.products.length > 0
                        ? "grid-cols-3"
                        : "grid-cols-1"
                }`}
            >
                {subCategoryProduct.products.length > 0 ? (
                    subCategoryProduct.products.map((item) => (
                        <div className="p-4 rounded-xl border" key={item.id}>
                            <div className="flex justify-center">
                                <img
                                    className="size-72 object-cover rounded-lg"
                                    src={`/storage/${item.image}`}
                                    alt="product"
                                />
                            </div>

                            <div className="flex flex-col mt-6 gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-semibold">
                                        {item.name}
                                    </span>
                                    <div className="flex mt-2 items-center gap-2">
                                        {addedProducts.includes(
                                            item.id as any
                                        ) ? (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="text-primary flex items-center gap-4 w-full rounded-sm font-semibold"
                                            >
                                                <Check />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="text-white flex items-center gap-4 w-full rounded-sm font-semibold"
                                            >
                                                <ShoppingBag />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {item.type === "box" ? (
                                    <div className="flex flex-col">
                                        <div className="flex text-xl items-end">
                                            <FormatRupiah value={item.price} />
                                            <span className="text-sm">
                                                / Box
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col">
                                        <div className="flex text-xl items-end">
                                            <FormatRupiah value={item.price} />
                                            <span className="text-sm">
                                                / Roll
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center mt-8 gap-2">
                                <Button className="w-full" asChild>
                                    <Link
                                        href={`/produk/${item.slug}/${item.id}`}
                                    >
                                        Detail Produk
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex w-full flex-col  justify-center py-40 border rounded-xl items-center ">
                        <img className="size-60" src={NoData} alt="" />
                        <span className="text-2xl mt-4">Tidak ada data</span>
                    </div>
                )}
            </div>
        </div>
    );
};
Show.layout = (page: any) => <ProductLayout head="Home">{page}</ProductLayout>;

export default Show;
