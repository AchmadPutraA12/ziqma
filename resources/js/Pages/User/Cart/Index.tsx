import Checkbox from "@/Components/Checkbox";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Products } from "@/types";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

export default function Index() {
    const [cart, setCart] = useLocalStorage<Products[]>(
        "cartZiqmaCollection",
        []
    );

    const [dimensions, setDimensions] = useState(
        cart.map(() => ({
            panjang: 0,
            lebar: 0,
            totalPanjangLebar: 0,
            boxYangAndaButuhkan: 0,
            totalHargaDenganBox: 0,
        }))
    );

    const removeItem = (index: number) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);

        const updatedDimensions = [...dimensions];
        updatedDimensions.splice(index, 1);
        setDimensions(updatedDimensions);

        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes.splice(index, 1);
        setCheckboxes(updatedCheckboxes);
    };

    const handlePanjangChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDimensions = [...dimensions];
        updatedDimensions[index].panjang = Number(event.target.value);
        updatedDimensions[index].totalPanjangLebar =
            updatedDimensions[index].panjang * updatedDimensions[index].lebar;
        updatedDimensions[index].boxYangAndaButuhkan = Math.ceil(
            updatedDimensions[index].totalPanjangLebar / cart[index].range
        );
        updatedDimensions[index].totalHargaDenganBox = Math.ceil(
            cart[index].price * updatedDimensions[index].boxYangAndaButuhkan
        );
        setDimensions(updatedDimensions);
    };

    const handleLebarChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const updatedDimensions = [...dimensions];
        updatedDimensions[index].lebar = Number(event.target.value);
        updatedDimensions[index].totalPanjangLebar =
            updatedDimensions[index].panjang * updatedDimensions[index].lebar;
        updatedDimensions[index].boxYangAndaButuhkan = Math.ceil(
            updatedDimensions[index].totalPanjangLebar / cart[index].range
        );
        updatedDimensions[index].totalHargaDenganBox = Math.ceil(
            cart[index].price * updatedDimensions[index].boxYangAndaButuhkan
        );
        setDimensions(updatedDimensions);
    };

    useEffect(() => {
        const updatedDimensions = dimensions.map((dim, index) => {
            const totalPanjangLebar = dim.panjang * dim.lebar;
            const boxYangAndaButuhkan = Math.ceil(
                totalPanjangLebar / cart[index].range
            );
            const totalHargaDenganBox = Math.ceil(
                cart[index].price * boxYangAndaButuhkan
            );
            return {
                ...dim,
                totalPanjangLebar,
                boxYangAndaButuhkan,
                totalHargaDenganBox,
            };
        });
        setDimensions(updatedDimensions);
    }, [cart]);

    const [mainCheckbox, setMainCheckbox] = useState(false);
    const [checkboxes, setCheckboxes] = useState<boolean[]>(
        cart.map(() => false)
    );
    const [totalHarga, setTotalHarga] = useState(0);

    const handleMainCheckboxChange = () => {
        const newValue = !mainCheckbox;
        setMainCheckbox(newValue);
        setCheckboxes(cart.map(() => newValue));
    };

    const handleCheckboxChange = (index: number) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);

        if (!updatedCheckboxes[index]) {
            setMainCheckbox(false);
        } else if (updatedCheckboxes.every((checked) => checked)) {
            setMainCheckbox(true);
        }
    };

    useEffect(() => {
        const newTotalHarga = cart.reduce((total, item, index) => {
            if (checkboxes[index]) {
                return total + dimensions[index].totalHargaDenganBox;
            }
            return total;
        }, 0);
        setTotalHarga(newTotalHarga);
    }, [checkboxes, dimensions]);

    const [name, setName] = useLocalStorage("name_user", "");
    const [email, setEmail] = useLocalStorage("email_user", "");
    const [phone, setPhone] = useLocalStorage("phone_user", "");
    const [address, setAddress] = useLocalStorage("address_user", "");
    const [rememberMe, setRememberMe] = useLocalStorage(
        "rememberMe_user",
        false
    );

    const isAllDimensionsFilled = checkboxes.every(
        (checked, index) =>
            !checked ||
            (dimensions[index].panjang > 0 && dimensions[index].lebar > 0)
    );

    const isAnyCheckboxChecked =
        checkboxes.some((checked) => checked) && isAllDimensionsFilled;

    const checkedItems = cart.filter((item, index) => checkboxes[index]);

    return (
        <div className="mt-32 container px-4 lg:px-20 relative">
            <h1 className="text-3xl font-bold">Keranjang</h1>
            <div className="grid grid-cols-3 mt-6">
                <div className="flex items-center gap-4">
                    <Checkbox
                        className="size-5"
                        checked={mainCheckbox}
                        onChange={handleMainCheckboxChange}
                    />
                    <span>Produk</span>
                </div>
                <div className="flex justify-center">Deskripsi</div>
            </div>
            <hr className="my-4" />
            <div className="grid items-center grid-cols-4 gap-7 mt-6">
                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="col-span-4 grid grid-cols-1 lg:grid-cols-4 gap-4"
                    >
                        <div className="flex items-center  gap-4 lg:col-span-1">
                            <Checkbox
                                className="size-5"
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <div className="flex flex-col gap-2">
                                <img
                                    className="size-32 font-semibold object-cover"
                                    src={`/storage/${item.imageColorState.image}`}
                                    alt=""
                                />
                                <div className="flex flex-col">
                                    <span className="text-xl">{item.name}</span>
                                    <span>{item.imageColorState.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-3 grid lg:grid-cols-2 gap-4">
                            <div className="flex flex-col p-4 rounded-t-lg border border-zinc-300">
                                <div className="grid p-2 grid-cols-2">
                                    <span>Harga/Box</span>
                                    <div className="flex items-center justify-end">
                                        <FormatRupiah value={item.price} />
                                    </div>
                                </div>
                                <div className="grid p-2 grid-cols-2">
                                    <span>Jangkauan Area/Box</span>
                                    <div className="flex items-center justify-end">
                                        <span className="text-sm">
                                            {item.range} m2
                                        </span>
                                    </div>
                                </div>
                                <div className="grid p-2 grid-cols-2">
                                    <span>Ketebalan</span>
                                    <div className="flex items-center justify-end">
                                        <span className="text-sm">
                                            {item.thickness}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid p-2 grid-cols-2">
                                    <span>Ukuran/Pcs</span>
                                    <div className="flex gap-2 items-center justify-end">
                                        <span className="text-sm">
                                            {item.height} cm
                                        </span>
                                        <span>x</span>
                                        <span className="text-sm">
                                            {item.width} cm
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-zinc-300  p-4">
                                <div className="grid items-center mt-4 grid-cols-2">
                                    <Label htmlFor={`panjang-${index}`}>
                                        Panjang
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            id={`panjang-${index}`}
                                            value={dimensions[index].panjang}
                                            onChange={(event) =>
                                                handlePanjangChange(
                                                    event,
                                                    index
                                                )
                                            }
                                        />
                                        <span className="absolute text-sm top-1/2 right-2 -translate-y-1/2">
                                            m
                                        </span>
                                    </div>
                                </div>
                                <div className="grid items-center mt-4 grid-cols-2">
                                    <Label htmlFor={`lebar-${index}`}>
                                        Lebar
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            id={`lebar-${index}`}
                                            value={dimensions[index].lebar}
                                            onChange={(event) =>
                                                handleLebarChange(event, index)
                                            }
                                        />
                                        <span className="absolute text-sm top-1/2 right-2 -translate-y-1/2">
                                            m
                                        </span>
                                    </div>
                                </div>
                                <div className="grid items-center mt-4 grid-cols-2">
                                    <Label htmlFor={`total_area-${index}`}>
                                        Total Area{" "}
                                        <span className="text-red-500">
                                            * (pembulatan)
                                        </span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={
                                                dimensions[index]
                                                    .totalPanjangLebar
                                            }
                                            type="text"
                                            disabled
                                            id={`total_area-${index}`}
                                        />
                                        <span className="absolute text-sm top-1/2 right-2 -translate-y-1/2">
                                            m2
                                        </span>
                                    </div>
                                </div>
                                <div className="grid items-center mt-4 grid-cols-2">
                                    <Label htmlFor={`box-${index}`}>
                                        Box{" "}
                                        <span className="text-red-500">
                                            * (yang anda butuhkan)
                                        </span>
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            value={
                                                dimensions[index]
                                                    .boxYangAndaButuhkan
                                            }
                                            type="text"
                                            disabled
                                            id={`box-${index}`}
                                        />
                                        <span className="absolute text-sm top-1/2 right-2 -translate-y-1/2">
                                            Box
                                        </span>
                                    </div>
                                </div>
                                <div className="grid items-center mt-4 grid-cols-2">
                                    <Label htmlFor={`harga-${index}`}>
                                        Harga
                                    </Label>
                                    <FormatRupiah
                                        value={
                                            dimensions[index]
                                                .totalHargaDenganBox
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            <Button
                                variant="ghost"
                                onClick={() => removeItem(index)}
                            >
                                <Trash2Icon className="text-red-500" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <div className="p-4 rounded-lg border border-zinc-300 shadow-md w-full lg:w-1/3">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Harga:</span>
                        <FormatRupiah value={totalHarga} />
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className="flex justify-center mt-4">
                                <Button
                                    className="w-1/2"
                                    disabled={!isAnyCheckboxChecked}
                                >
                                    Beli
                                </Button>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className=" h-[80vh] lg:h-auto overflow-y-auto">
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Apakah anda yakin ingin beli?
                                </AlertDialogTitle>
                            </AlertDialogHeader>{" "}
                            {isAnyCheckboxChecked && (
                                <div className="flex flex-col gap-2 mt-2">
                                    <span className="text-xl font-semibold">
                                        Data Pemesan
                                    </span>
                                    <div className="grid mt-4 items-center grid-cols-4">
                                        <Label
                                            htmlFor="name"
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
                                    </div>{" "}
                                    <div className="grid items-center grid-cols-4">
                                        <Label
                                            htmlFor="email"
                                            className="col-span-1"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            value={email}
                                            id="email"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                            required
                                            type="email"
                                            className="col-span-3"
                                        />
                                    </div>{" "}
                                    <div className="grid items-center grid-cols-4">
                                        <Label
                                            htmlFor="phone"
                                            className="col-span-1"
                                        >
                                            No Whatsapp
                                        </Label>
                                        <Input
                                            value={phone}
                                            id="phone"
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                            }}
                                            required
                                            className="col-span-3"
                                            type="text"
                                        />
                                    </div>{" "}
                                    <div className="grid items-center grid-cols-4">
                                        <Label
                                            htmlFor="address"
                                            className="col-span-1"
                                        >
                                            Alamat
                                        </Label>
                                        <Input
                                            value={address}
                                            id="address"
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                            }}
                                            required
                                            className="col-span-3"
                                            type="text"
                                        />
                                    </div>
                                </div>
                            )}
                            <AlertDialogFooter className="mt-5">
                                <AlertDialogCancel className="w-24">
                                    Batal
                                </AlertDialogCancel>

                                <Button
                                    asChild
                                    disabled={
                                        !name || !email || !phone || !address
                                    }
                                    className="w-24"
                                >
                                    <a
                                        href={route("user.checkout", {
                                            name: name,
                                            email: email,
                                            phone: phone,
                                            address: address,
                                            cart: checkedItems.map(
                                                (item, index) => ({
                                                    colorProduct:
                                                        item.imageColorState
                                                            .name,
                                                    nameProduct: item.name,
                                                    priceBox: item.price,
                                                    totalBox:
                                                        dimensions[index]
                                                            .boxYangAndaButuhkan,
                                                    totalPrice:
                                                        dimensions[index]
                                                            .totalHargaDenganBox,
                                                })
                                            ),
                                            amount: totalHarga,
                                        })}
                                    >
                                        Beli
                                    </a>
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page: any) => (
    <GuestLayout head="Keranjang">{page}</GuestLayout>
);
