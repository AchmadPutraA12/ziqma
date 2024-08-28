import React, { useEffect, useState } from "react";
import ProductLayout from "@/Layouts/ProductLayout";
import { ProductColor, ProductRoomMockup, Products } from "@/types";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import sanitizeAndValidateHTML from "@/lib/SanitizeHTML";
import { FormatRupiah } from "@arismun/format-rupiah";
import {
    Calculator,
    PenSquare,
    PhoneIncoming,
    ShoppingCart,
} from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import useLocalStorage from "use-local-storage";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import Toastify from "@/Components/Toastify";
import { Link } from "@inertiajs/react";
import Checkbox from "@/Components/Checkbox";

interface Props {
    produkMockup: ProductRoomMockup[];
    product: Products;
}

const ShowDetailProduct = ({ produkMockup, product }: Props) => {
    const [cart, setCart] = useLocalStorage<Products[]>(
        "cartZiqmaCollection",
        []
    );
    const [addedProducts, setAddedProducts] = useState<any[]>([]);

    const addToCart = (product: Products) => {
        if (cart.length < 10) {
            const existingProduct = cart.find(
                (item) =>
                    item.id === product.id &&
                    item.imageColorState.id === imageColorState.id
            );

            if (!existingProduct) {
                const merge = { ...product, imageColorState };
                const updatedCart = [...cart, merge];
                setCart(updatedCart);
                const updatedAddedProducts = [...addedProducts, product.id];
                setAddedProducts(updatedAddedProducts);
                localStorage.setItem(
                    "cartZiqmaCollection",
                    JSON.stringify(updatedCart)
                );
                toast.success(`Produk ${product.name} berhasil ditambahkan  `, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error(`Produk ${product.name} sudah ada di keranjang`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } else {
            toast.error(`Keranjang sudah penuh`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const [selectedColorId, setSelectedColorId] = useState<any>(null);
    const [selectedRuanganId, setSelectedRuanganId] = useState<any>(null);
    const [detailRuanganFoto, setDetailRuanganFoto] = useState<any>(null);

    const uniqueColors = [
        ...new Set(produkMockup.map((produk) => produk.product_color.id)),
    ];
    const uniqueRuangans = [
        ...new Set(produkMockup.map((produk) => produk.room.id)),
    ];

    const [imageColorState, setImageColorState] = useState<ProductColor>(
        {} as ProductColor
    );

    useEffect(() => {
        setImageColorState(produkMockup[0].product_color);
    }, [produkMockup]);

    const handleColorClick = (colorId: number) => {
        if (selectedColorId !== colorId) {
            setSelectedColorId(colorId);
            checkAndDisplayDetailRuangan(colorId, selectedRuanganId);
        }
    };

    const handleImageColor = (color: ProductColor) => {
        setImageColorState(color);
    };

    const handleRuanganClick = (ruanganId: number) => {
        if (selectedRuanganId !== ruanganId) {
            setSelectedRuanganId(ruanganId);
            checkAndDisplayDetailRuangan(selectedColorId, ruanganId);
        }
    };

    const checkAndDisplayDetailRuangan = (colorId: any, ruanganId: any) => {
        if (colorId !== null && ruanganId !== null) {
            const detailRuangan = produkMockup.find(
                (produk) =>
                    produk.product_color.id === colorId &&
                    produk.room.id === ruanganId
            );
            if (detailRuangan) {
                setDetailRuanganFoto(detailRuangan.image);
            } else {
                setDetailRuanganFoto(null);
            }
        } else {
            setDetailRuanganFoto(null);
        }
    };

    useEffect(() => {
        if (produkMockup.length > 0) {
            const firstColorId = produkMockup[0].product_color.id;
            const firstRuanganId = produkMockup[0].room.id;
            setSelectedColorId(firstColorId);
            setSelectedRuanganId(firstRuanganId);
            checkAndDisplayDetailRuangan(firstColorId, firstRuanganId);
        }
    }, [produkMockup]);

    const [panjang, setPanjang] = useState<number | any>(0);
    const [lebar, setLebar] = useState<number | any>(0);
    const [totalPanjangLebar, setTotalPanjangLebar] = useState<number | any>(0);
    const [boxYangAndaButuhkan, setBoxYangAndaButuhkan] = useState<
        number | any
    >(0);
    const [totalHargaDenganBox, setTotalHargaDenganBox] = useState<
        number | any
    >(0);

    const handlePanjangChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPanjang(Number(event.target.value));
    };

    const handleLebarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLebar(Number(event.target.value));
    };

    useEffect(() => {
        setTotalPanjangLebar(panjang * lebar);
    }, [panjang, lebar]);

    useEffect(() => {
        if (product) {
            setBoxYangAndaButuhkan(
                Math.ceil(totalPanjangLebar / product.range)
            );
        }
    }, [totalPanjangLebar]);

    useEffect(() => {
        if (product) {
            setTotalHargaDenganBox(
                Math.ceil(product.price * boxYangAndaButuhkan)
            );
        }
    }, [boxYangAndaButuhkan]);

    const [name, setName] = useLocalStorage("name_user", "");
    const [email, setEmail] = useLocalStorage("email_user", "");
    const [phone, setPhone] = useLocalStorage("phone_user", "");
    const [address, setAddress] = useLocalStorage("address_user", "");

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isSizeComplete, setIsSizeComplete] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setIsFormComplete(name.trim() !== "" && phone.trim() !== "");
    }, [name, phone]);

    useEffect(() => {
        setIsSizeComplete(panjang > 0 && lebar > 0);
    }, [panjang, lebar]);

    return (
        <>
            <Toastify />
            <div className="flex flex-col-reverse lg:flex-row  w-full gap-10 ">
                <div className="flex flex-col lg:flex-col gap-4 w-full lg:w-1/2">
                    <div className="flex flex-col  ">
                        <h3 className="mb-2 text-lg font-semibold">
                            Warna Produk
                        </h3>
                        <div className="grid  lg:p-4 gap-2 grid-cols-4 lg:grid-cols-4 h-auto overflow-y-auto ">
                            {uniqueColors.map((colorId) => {
                                const colorProduks = produkMockup.find(
                                    (produk) =>
                                        produk.product_color.id === colorId
                                );
                                if (colorProduks) {
                                    return (
                                        <div
                                            key={colorId}
                                            className={`cursor-pointer flex gap-1 lg:h-auto flex-col items-center p-2 rounded ${selectedColorId === colorId
                                                ? "bg-blue-200"
                                                : ""
                                                }`}
                                            onClick={() => {
                                                handleColorClick(
                                                    colorId as any
                                                );
                                                handleImageColor(
                                                    colorProduks.product_color
                                                );
                                            }}
                                        >
                                            <img
                                                src={`/storage/${colorProduks.product_color.image}`}
                                                alt="Foto Color"
                                                className="rounded-lg"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                            <span className="text-sm text-center">
                                                {
                                                    colorProduks.product_color
                                                        .name
                                                }
                                            </span>
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <h3 className="mb-2 text-lg font-semibold">
                            {product.name}
                        </h3>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: sanitizeAndValidateHTML(
                                    product.description
                                ),
                            }}
                        ></div>
                        {product.type === "box" ? (
                            <div className="flex flex-col mt-4 p-4 rounded-t-lg border  border-zinc-300">
                                <div className="flex items-center gap-2">
                                    <PenSquare />
                                    <span className="text-lg font-semibold">
                                        Detail
                                    </span>
                                </div>
                                <div className="grid  p-2 mt-4  grid-cols-2">
                                    <span>Harga/Box</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <FormatRupiah value={product.price} />
                                    </div>
                                </div>
                                <div className="grid p-2 grid-cols-2">
                                    <span>Jangkauan Area/Box</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.range} m2
                                        </span>
                                    </div>
                                </div>
                                <div className="grid p-2 grid-cols-2">
                                    <span>Ketebalan</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.thickness}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid  p-2 grid-cols-2 ">
                                    <span>Ukuran/Pcs</span>
                                    <div className="flex gap-2 items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.height} cm
                                        </span>
                                        <span>x</span>
                                        <span className="text-sm">
                                            {product.width} cm
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : product.type === "roll" ? (
                            <div className="flex flex-col mt-4 p-2 rounded-t-lg border  border-zinc-300">
                                <div className="flex items-center gap-2 ">
                                    <PenSquare />
                                    <span className="text-lg font-semibold">
                                        Detail
                                    </span>
                                </div>
                                <div className="grid  p-2  grid-cols-2">
                                    <span>Harga/Roll</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <FormatRupiah value={product.price} />
                                    </div>
                                </div>
                                <div className="grid  p-2  grid-cols-2">
                                    <span>Jangkauan Area/Roll</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.range} m2
                                        </span>
                                    </div>
                                </div>
                                <div className="grid  p-2  grid-cols-2">
                                    <span>Ketebalan</span>
                                    <div className="flex items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.thickness}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid  p-2  grid-cols-2">
                                    <span>Ukuran/Roll</span>
                                    <div className="flex gap-2 items-center justify-end lg:justify-start">
                                        <span className="text-sm">
                                            {product.height} m
                                        </span>
                                        <span>x</span>
                                        <span className="text-sm">
                                            {product.width} m
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="border border-zinc-300 border-t-transparent p-4">
                            <div className="flex items-center gap-1">
                                <Calculator />
                                <span className="text-lg font-semibold">
                                    Masukkan detail ruangan anda
                                </span>
                            </div>
                            <div className="grid items-center mt-4  grid-cols-2">
                                <Label htmlFor="panjang">Panjang</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        id="panjang"
                                        onChange={handlePanjangChange}
                                    />
                                    <span className="absolute text-sm top-1/2  right-2 -translate-y-1/2">
                                        m
                                    </span>
                                </div>
                            </div>
                            <div className="grid items-center mt-4  grid-cols-2">
                                <Label htmlFor="lebar">Lebar</Label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        id="lebar"
                                        onChange={handleLebarChange}
                                    />
                                    <span className="absolute text-sm top-1/2  right-2 -translate-y-1/2">
                                        m
                                    </span>
                                </div>
                            </div>
                            <div className="grid items-center mt-4  grid-cols-2">
                                <Label htmlFor="total_area">
                                    Total Area{" "}
                                    <span className="text-red-500">
                                        * (pembulatan)
                                    </span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        value={totalPanjangLebar}
                                        type="text"
                                        disabled
                                        id="total_area"
                                    />
                                    <span className="absolute text-sm top-1/2  right-2 -translate-y-1/2">
                                        m2
                                    </span>
                                </div>
                            </div>
                            <div className="grid items-center mt-4  grid-cols-2">
                                <Label htmlFor="total_area">
                                    {product.type === "roll"
                                        ? "Total Roll"
                                        : "Total Box"}
                                    <span className="text-red-500">
                                        * (yang anda butuhkan)
                                    </span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        value={boxYangAndaButuhkan}
                                        type="text"
                                        disabled
                                        id="total_area"
                                    />
                                    <span className="absolute text-sm top-1/2  right-2 -translate-y-1/2">
                                        {product.type === "roll"
                                            ? "roll"
                                            : "box"}
                                    </span>
                                </div>
                            </div>
                            <div className="grid items-center mt-4  grid-cols-2">
                                <Label htmlFor="lebar">Harga</Label>
                                <FormatRupiah value={totalHargaDenganBox} />
                            </div>
                            <div className="flex items-center gap-2 mt-10">
                                <AlertDialog
                                    open={showDialog}
                                    onOpenChange={setShowDialog}
                                >
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            disabled={!isSizeComplete}
                                            className="w-full"
                                        >
                                            Beli
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className=" h-[80vh] lg:h-auto overflow-y-auto">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Apakah anda yakin ingin beli?
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <div className="flex flex-col md:flex-row gap-10 mt-4 bg-slate-200 p-4 rounded-lg border  ">
                                            <div className="flex items-center justify-center flex-col gap-2">
                                                <img
                                                    src={`/storage/${imageColorState.image}`}
                                                    alt=""
                                                    className="object-contain rounded-lg size-32"
                                                />
                                                <span>
                                                    {imageColorState.name}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1 md:w-1/2">
                                                <div className="grid grid-cols-2">
                                                    <span>Panjang</span>
                                                    <span className="flex justify-end">
                                                        {panjang} m
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <span>Lebar</span>
                                                    <span className="flex justify-end">
                                                        {lebar} m
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <span>Total Area</span>
                                                    <span className="flex justify-end">
                                                        {totalPanjangLebar} m2
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <span>
                                                        {product.type === "roll"
                                                            ? "Total Roll"
                                                            : "Total Box"}
                                                    </span>
                                                    <span className="flex justify-end">
                                                        {boxYangAndaButuhkan}{" "}
                                                        {product.type === "roll"
                                                            ? "roll"
                                                            : "box"}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <span>Total Harga</span>
                                                    <span className="flex justify-end">
                                                        <FormatRupiah
                                                            value={
                                                                totalHargaDenganBox
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 mt-2">
                                            <span className="text-xl font-semibold">
                                                Data Pemesan
                                            </span>
                                            <div className="grid mt-4 items-center grid-cols-4">
                                                <Label
                                                    htmlFor="name"
                                                    variant={"wajib"}
                                                    className="col-span-1"
                                                >
                                                    Nama
                                                </Label>
                                                <Input
                                                    value={name}
                                                    id="name"
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    required
                                                    className="col-span-3"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="grid items-center grid-cols-4">
                                                <Label
                                                    htmlFor="phone"
                                                    className="col-span-1"
                                                    variant={"wajib"}
                                                >
                                                    No Whatsapp
                                                </Label>
                                                <Input
                                                    value={phone}
                                                    id="phone"
                                                    onChange={(e) => {
                                                        setPhone(
                                                            e.target.value
                                                        );
                                                    }}
                                                    required
                                                    className="col-span-3"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="grid items-center grid-cols-4">
                                                <Label
                                                    variant={"optional"}
                                                    htmlFor="email"
                                                    className="col-span-1"
                                                >
                                                    Email
                                                </Label>
                                                <Input
                                                    value={email}
                                                    id="email"
                                                    onChange={(e) => {
                                                        setEmail(
                                                            e.target.value
                                                        );
                                                    }}
                                                    required
                                                    type="email"
                                                    className="col-span-3"
                                                />
                                            </div>

                                            <div className="grid items-center grid-cols-4">
                                                <Label
                                                    variant={"optional"}
                                                    htmlFor="address"
                                                    className="col-span-1"
                                                >
                                                    Alamat
                                                </Label>
                                                <Input
                                                    value={address}
                                                    id="address"
                                                    onChange={(e) => {
                                                        setAddress(
                                                            e.target.value
                                                        );
                                                    }}
                                                    required
                                                    className="col-span-3"
                                                    type="text"
                                                />
                                            </div>
                                        </div>
                                        <AlertDialogFooter className="mt-5">
                                            <AlertDialogCancel className="md:w-24">
                                                Batal
                                            </AlertDialogCancel>
                                            {isFormComplete ? (
                                                <Button
                                                    asChild
                                                    type="button"
                                                    onClick={() => {
                                                        setShowDialog(false);
                                                    }}
                                                    className="md:w-24"
                                                >
                                                    <a
                                                        href={route(
                                                            "user.checkout",
                                                            {
                                                                name: name,
                                                                email: email,
                                                                phone: phone,
                                                                address:
                                                                    address,
                                                                colorProduct:
                                                                    imageColorState.name,
                                                                nameProduct:
                                                                    product.name,
                                                                priceBox:
                                                                    product.price,
                                                                type:
                                                                    product.type,
                                                                totalBox:
                                                                    boxYangAndaButuhkan,
                                                                totalPrice:
                                                                    totalHargaDenganBox,
                                                                amount: totalHargaDenganBox,
                                                            }
                                                        )}
                                                    >
                                                        Beli
                                                    </a>
                                                </Button>
                                            ) : (
                                                <Button
                                                    disabled
                                                    className="w-24"
                                                >
                                                    Beli
                                                </Button>
                                            )}
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-col gap-4 mt-5 lg:w-1/2  ">
                    {detailRuanganFoto && (
                        <div className=" w-full ">
                            <h3 className="mb-2 text-lg font-semibold">
                                Detail Ruangan
                            </h3>
                            <img
                                src={`/storage/${detailRuanganFoto}`}
                                alt="Detail Ruangan"
                                className="w-full rounded-lg lg:max-w-[468px] h-auto"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row justify-center w-full">
                        <span className="text-lg font-semibold lg:hidden">
                            Ruangan
                        </span>
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full max-w-sm  h-[100px]"
                        >
                            <CarouselContent>
                                {uniqueRuangans.map((ruanganId, index) => {
                                    const ruanganProduk = produkMockup.find(
                                        (produk) => produk.room.id === ruanganId
                                    );

                                    if (ruanganProduk) {
                                        return (
                                            <CarouselItem
                                                key={index}
                                                className="basis-1/3"
                                            >
                                                <div
                                                    key={ruanganId}
                                                    className={`cursor-pointer   p-2 rounded ${selectedRuanganId ===
                                                        ruanganId
                                                        ? "bg-blue-200"
                                                        : ""
                                                        }`}
                                                    onClick={() =>
                                                        handleRuanganClick(
                                                            ruanganId as any
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={`/storage/${ruanganProduk.room.image}`}
                                                        alt="Foto Ruangan"
                                                        className=" rounded-lg object-cover"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        );
                                    }
                                    return null;
                                })}
                            </CarouselContent>
                            <CarouselPrevious className="hidden lg:block" />
                            <CarouselNext className="hidden lg:block" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
};

ShowDetailProduct.layout = (page: React.ReactNode) => (
    <ProductLayout head="Home">{page}</ProductLayout>
);

export default ShowDetailProduct;
