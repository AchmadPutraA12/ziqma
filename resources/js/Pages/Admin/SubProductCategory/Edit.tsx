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
import { PageProps, SubProductCategory } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { DoorOpen, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    sub_category_product: SubProductCategory;
}

const Edit = ({ sub_category_product }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, processing, reset } = useForm({
        name: sub_category_product.name,
        product_category_id: sub_category_product.product_category_id,
    });

    const { productCategories } = usePage<PageProps>().props;

    useEffect(() => {
        setData({
            ...data,
            name: sub_category_product.name,
            product_category_id: sub_category_product.product_category_id,
        });
    }, [sub_category_product]);

    const submit = (e: any) => {
        e.preventDefault();
        router.post(
            route("admin.sub-product-category.update", sub_category_product.id),
            {
                ...data,
                _method: "put",
                forceFormData: true,
            },
            {
                preserveScroll: true,
                onSuccess: () => setShowModal(false),
                onError: () => setShowModal(false),
            }
        );
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
                <DialogContent className=" max-w-[340px] z-[120] sm:max-w-[600px] h-auto  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="py-3 text-xl">
                            Update Kategori Produk
                        </DialogTitle>
                    </DialogHeader>
                    <div className="bg-white mt-2">
                        <form onSubmit={submit}>
                            <div className="flex flex-col gap-4 ">
                                {/* <div className="mb-4 flex flex-col gap-2">
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
                                </div> */}
                                <InputTextLabelEdit
                                    labelFor="name"
                                    labelText="Nama Kategori Produk"
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
                                        placeholder:
                                            "Masukkan nama kategori produk",
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
                                    optionName="Pilih Kategori Produk"
                                    htmlFor="product_category_id"
                                    labelName="Kategori Produk"
                                    optionMap={productCategories.map(
                                        (item, index) => {
                                            return (
                                                <option
                                                    value={item.id}
                                                    key={index}
                                                >
                                                    {item.name}
                                                </option>
                                            );
                                        }
                                    )}
                                    errors={errors.product_category_id}
                                    selectOptionProps={{
                                        name: "product_category_id",
                                        value: data.product_category_id,
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                product_category_id:
                                                    e.target.value,
                                            });
                                        },
                                    }}
                                />
                                {/* <div className="flex flex-col gap-3 mt-2 text-sm">
                                    <Label htmlFor="description">
                                        Deskripsi Materi
                                    </Label>
                                    <TextEditor
                                        value={data.description}
                                        onChange={(value) => {
                                            setData({
                                                ...data,
                                                description: value,
                                            });
                                        }}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500">
                                            {errors.description}
                                        </span>
                                    )}
                                </div> */}
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
