import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { PageProps, ProductColor } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { DoorOpen, Pen, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    productColor: ProductColor;
}

const Edit = ({ productColor }: EditProps) => {
    const [showModal, setShowModal] = useState(false);

    const { product } = usePage<PageProps>().props;

    const { data, setData, errors, processing, reset } = useForm({
        name: productColor.name,
        image: productColor.image,
        product_id: productColor.product_id,
    });

    useEffect(() => {
        setData({
            ...data,
            name: productColor.name,
            image: productColor.image,
            product_id: productColor.product_id,
        });
    }, [productColor]);
    const submit = (e: any) => {
        e.preventDefault();
        router.post(
            route("admin.product-color.update", productColor.id),
            {
                ...data,
                _method: "put",
                forceFormData: true,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowModal(false);
                },
            }
        );
    };
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setData({ ...data, image: file });
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };
    return (
        <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                    <Button
                        variant={"outline"}
                        onClick={() => setShowModal(true)}
                        size={"sm"}
                        className=" hover:bg-orange-200 border-orange-500"
                    >
                        <PenBoxIcon className="h-4 w-4 text-orange-500" />
                    </Button>
                </DialogTrigger>
                <DialogContent className=" max-w-[340px] z-[120] sm:max-w-[600px] h-[85vh] md:h-[70vh]  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="py-3 text-xl">
                            Update Warna Produk
                        </DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-2">
                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-4 ">
                                <div className="mb-4 flex flex-col gap-2">
                                    <div className="flex items-center  w-full justify-center mt-2">
                                        <div className="relative">
                                            <img
                                                className=" object-cover h-52 w-60 border-2 rounded-xl"
                                                src={
                                                    previewImage
                                                        ? previewImage
                                                        : window.location
                                                              .origin +
                                                          "/storage/" +
                                                          data.image
                                                }
                                            />
                                            <label
                                                htmlFor="foto"
                                                className="font-semibold text-sm"
                                            >
                                                <Pen className="absolute size-10 cursor-pointer text-white p-2 rounded-full bg-blue-500 -right-3 -bottom-3" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className=" items-center gap-2 hidden">
                                        <input
                                            id="foto"
                                            type="file"
                                            className="w-full px-4 py-2"
                                            name="foto"
                                            onChange={(e) =>
                                                handleFileChange(e)
                                            }
                                        />
                                    </div>

                                    <span className="text-red-600">
                                        {errors.image}
                                    </span>
                                </div>
                                <InputTextLabelEdit
                                    labelFor="name"
                                    labelText="Nama Produk"
                                    inputId="name"
                                    error={`${
                                        errors && errors.name === undefined
                                            ? ""
                                            : errors.name
                                    }`}
                                    inputProps={{
                                        name: "name",
                                        value: data.name,
                                        type: "text",
                                        placeholder: "Masukkan produk",
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                name: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <DoorOpen className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                </InputTextLabelEdit>

                                <SelectOptionCustom
                                    optionName="Pilih Sub Kategori Produk"
                                    htmlFor="product_id"
                                    labelName="Sub Kategori Produk"
                                    optionMap={product.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                    errors={errors.product_id}
                                    selectOptionProps={{
                                        name: "product_id",
                                        value: data.product_id,
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                product_id: e.target.value,
                                            });
                                        },
                                    }}
                                />
                            </div>
                            <div className="mt-8 w-full flex gap-4 items-center justify-end">
                                <Button
                                    className="w-1/2"
                                    disabled={processing}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Edit;
