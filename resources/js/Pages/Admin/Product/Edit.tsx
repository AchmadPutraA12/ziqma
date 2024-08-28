import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import TextEditor from "@/Components/TextEditor";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { PageProps, Products } from "@/types";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    DoorOpen,
    PcCase,
    Pen,
    PenBoxIcon,
    Tally3,
} from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    product: Products;
}

const Edit = ({ product }: EditProps) => {
    const [showModal, setShowModal] = useState(false);

    const { subProductCategories } = usePage<PageProps>().props;

    const { data, setData, errors, processing, reset } = useForm({
        name: product.name,
        description: product.description,
        image: product.image,
        thickness: product.thickness,
        range: product.range,
        pcs: product.pcs || "",
        price: product.price,
        width: product.width || "",
        height: product.height || "",
        type: product.type,
        price_per_square_meter: product.price_per_square_meter,
        sub_product_category_id: product.sub_product_category_id,
    });

    useEffect(() => {
        setData({
            ...data,
            name: product.name,
            description: product.description,
            image: product.image,
            thickness: product.thickness,
            range: product.range,
            pcs: product.pcs || "",
            price: product.price,
            width: product.width || "",
            height: product.height || "",
            price_per_square_meter: product.price_per_square_meter,
            sub_product_category_id: product.sub_product_category_id,
        });
    }, [product]);
    const submit = (e: any) => {
        e.preventDefault();
        router.post(
            route("admin.product.update", product.id),
            {
                ...data,
                _method: "put",
                forceFormData: true,
            },
            {
                preserveScroll: true,
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

    const handleChangePcs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pcsValue = e.target.value;
        setData({ ...data, pcs: pcsValue });
    };
    const handleChangeWidthBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const widthValue = e.target.value;
        setData({ ...data, width: widthValue });
    };

    const handleChangeHeightBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const heightValue = e.target.value;
        setData({ ...data, height: heightValue });
    };

    const handleChangeWidthRoll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const widthValue = e.target.value;
        setData({ ...data, width: widthValue });
    };

    const handleChangeHeightRoll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const heightValue = e.target.value;
        setData({ ...data, height: heightValue });
    };

    useEffect(() => {
        const pcs: any = data.pcs;
        const widthValue = parseFloat(data.width as any);
        const heightValue = parseFloat(data.height as any);

        if (
            !isNaN(widthValue) &&
            !isNaN(heightValue) &&
            !isNaN(pcs) &&
            data.type === "box" &&
            pcs > 0
        ) {
            const areaInSquareMeters: any =
                (pcs * widthValue * heightValue) / 10000;
            const roundedArea: any = parseFloat(areaInSquareMeters.toFixed(3));
            setData({ ...data, range: roundedArea });
        } else if (
            !isNaN(widthValue) &&
            !isNaN(heightValue) &&
            !isNaN(pcs) &&
            data.type === "roll"
        ) {
            const areaInSquareMeters: any = widthValue * heightValue;
            const roundedArea: any = parseFloat(areaInSquareMeters.toFixed(3));
            setData({ ...data, range: roundedArea });
        }
    }, [data.width, data.height, data.pcs]);

    const value = [2, 4];
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
                <DialogContent className=" max-w-[340px] z-[120] sm:max-w-[600px] h-[85vh]  rounded-lg overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="py-3 text-xl">
                            Update Produk
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
                                    variant="wajib"
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
                                <InputTextLabelEdit
                                    variant="wajib"
                                    labelFor="price_per_square_meter"
                                    labelText="Harga/m2"
                                    error={
                                        errors && errors.price_per_square_meter
                                            ? errors.price_per_square_meter
                                            : ""
                                    }
                                    inputId="price_per_square_meter"
                                    inputProps={{
                                        value:
                                            (data.price_per_square_meter as any) !==
                                                "" &&
                                            !isNaN(
                                                data.price_per_square_meter as
                                                    | string
                                                    | number
                                                    | any
                                            )
                                                ? parseInt(
                                                      data.price_per_square_meter as any
                                                  ).toLocaleString("id-ID")
                                                : "", // Menghindari nilai NaN
                                        name: "price_per_square_meter",
                                        type: "text",
                                        placeholder: "Masukkan harga/m2",
                                        onChange: (e: any) => {
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                );
                                            setData({
                                                ...data,
                                                price_per_square_meter: value,
                                            });
                                        },
                                    }}
                                >
                                    <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                        Rp
                                    </span>
                                </InputTextLabelEdit>
                                <InputTextLabelEdit
                                    variant="wajib"
                                    labelFor="thickness"
                                    labelText="Ketebalan"
                                    error={
                                        errors && errors.thickness
                                            ? errors.thickness
                                            : ""
                                    }
                                    inputId="thickness"
                                    inputProps={{
                                        value: data.thickness,
                                        name: "thickness",
                                        type: "text",
                                        placeholder:
                                            "Masukkan ketebalan (3 mm)",
                                        onChange: (e) => {
                                            setData({
                                                ...data,
                                                thickness: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <Tally3 className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                </InputTextLabelEdit>
                                {data.type === "box" ? (
                                    <>
                                        <InputTextLabelEdit
                                            variant="wajib"
                                            labelFor="price"
                                            labelText="Harga/box"
                                            error={
                                                errors && errors.price
                                                    ? errors.price
                                                    : ""
                                            }
                                            inputId="price"
                                            inputProps={{
                                                value:
                                                    (data.price as any) !==
                                                        "" &&
                                                    !isNaN(
                                                        data.price as
                                                            | string
                                                            | number
                                                            | any
                                                    )
                                                        ? parseInt(
                                                              data.price as any
                                                          ).toLocaleString(
                                                              "id-ID"
                                                          )
                                                        : "", // Menghindari nilai NaN
                                                name: "price",
                                                type: "text",
                                                placeholder:
                                                    "Masukkan harga/box",
                                                onChange: (e: any) => {
                                                    const value =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                        );
                                                    setData({
                                                        ...data,
                                                        price: value,
                                                    });
                                                },
                                            }}
                                        >
                                            <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                                Rp
                                            </span>
                                        </InputTextLabelEdit>
                                        <div className="flex items-center gap-3">
                                            <InputTextLabelEdit
                                                variant="wajib"
                                                labelFor="pcs"
                                                labelText="Pcs"
                                                error={
                                                    errors && errors.pcs
                                                        ? errors.pcs
                                                        : ""
                                                }
                                                inputId="pcs"
                                                inputProps={{
                                                    value: data.pcs,
                                                    name: "pcs",
                                                    type: "number",
                                                    placeholder:
                                                        "Masukkan pcs (20 pcs)",
                                                    onChange: (e: any) => {
                                                        setData({
                                                            ...data,
                                                            pcs: e.target.value,
                                                        });
                                                    },
                                                }}
                                            >
                                                <PcCase className=" size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                                            </InputTextLabelEdit>
                                            <InputTextLabelEdit
                                                variant="wajib"
                                                labelFor="height"
                                                labelText="Panjang"
                                                error={
                                                    errors && errors.height
                                                        ? errors.height
                                                        : ""
                                                }
                                                inputId="height"
                                                inputProps={{
                                                    value: data.height,
                                                    name: "height",
                                                    type: "number",
                                                    placeholder: "20 cm",
                                                    onChange:
                                                        handleChangeHeightBox,
                                                }}
                                            >
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                                    P
                                                </span>{" "}
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                                    cm
                                                </span>
                                            </InputTextLabelEdit>{" "}
                                            <InputTextLabelEdit
                                                variant="wajib"
                                                labelFor="width"
                                                labelText="Lebar"
                                                error={
                                                    errors && errors.width
                                                        ? errors.width
                                                        : ""
                                                }
                                                inputId="width"
                                                inputProps={{
                                                    value: data.width,
                                                    name: "width",
                                                    type: "number",
                                                    placeholder: "20 cm",
                                                    onChange:
                                                        handleChangeWidthBox,
                                                }}
                                            >
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                                    L
                                                </span>{" "}
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                                    cm
                                                </span>
                                            </InputTextLabelEdit>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <InputTextLabelEdit
                                            labelFor="price"
                                            labelText="Harga/roll"
                                            variant="wajib"
                                            error={
                                                errors && errors.price
                                                    ? errors.price
                                                    : ""
                                            }
                                            inputId="price"
                                            inputProps={{
                                                value:
                                                    (data.price as any) !==
                                                        "" &&
                                                    !isNaN(
                                                        data.price as
                                                            | string
                                                            | number
                                                            | any
                                                    )
                                                        ? parseInt(
                                                              data.price as any
                                                          ).toLocaleString(
                                                              "id-ID"
                                                          )
                                                        : "", // Menghindari nilai NaN
                                                name: "price",
                                                type: "text",
                                                placeholder:
                                                    "Masukkan harga/roll",
                                                onChange: (e: any) => {
                                                    const value =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                        );
                                                    setData({
                                                        ...data,
                                                        price: value,
                                                    });
                                                },
                                            }}
                                        >
                                            <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                                Rp
                                            </span>
                                        </InputTextLabelEdit>
                                        <div className="flex items-center gap-3">
                                            <InputTextLabelEdit
                                                variant="wajib"
                                                labelFor="height"
                                                labelText="Panjang"
                                                error={
                                                    errors && errors.height
                                                        ? errors.height
                                                        : ""
                                                }
                                                inputId="height"
                                                inputProps={{
                                                    value: data.height,
                                                    name: "height",
                                                    type: "number",
                                                    placeholder: "20 cm",
                                                    onChange:
                                                        handleChangeHeightRoll,
                                                }}
                                            >
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                                    P
                                                </span>{" "}
                                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                                    m
                                                </span>
                                            </InputTextLabelEdit>{" "}
                                            <SelectOptionCustom
                                                variant="wajib"
                                                optionName="pilih lebar"
                                                htmlFor="product_id"
                                                labelName="Lebar"
                                                optionMap={value.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                value={item.valueOf()}
                                                                key={index}
                                                            >
                                                                {item.valueOf()}{" "}
                                                                m
                                                            </option>
                                                        );
                                                    }
                                                )}
                                                errors={errors.width}
                                                selectOptionProps={{
                                                    value: data.width,
                                                    name: "width",
                                                    type: "number",

                                                    onChange:
                                                        handleChangeWidthRoll,
                                                }}
                                            />
                                        </div>
                                    </>
                                )}

                                <InputTextLabelEdit
                                    labelFor="range"
                                    labelText="Jangkauan"
                                    error={
                                        errors && errors.range
                                            ? errors.range
                                            : ""
                                    }
                                    inputId="range"
                                    inputProps={{
                                        disabled: true,
                                        value: data.range,
                                        name: "range",
                                        type: "number",
                                        placeholder: "Masukkan jangkauan",
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                range: e.target.value,
                                            });
                                        },
                                    }}
                                >
                                    <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                        m
                                    </span>
                                    <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                        m2
                                    </span>
                                </InputTextLabelEdit>
                                <SelectOptionCustom
                                    optionName="Pilih Sub Kategori Produk"
                                    variant="wajib"
                                    htmlFor="sub_product_category_id"
                                    labelName="Sub Kategori Produk"
                                    optionMap={subProductCategories.map(
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
                                    errors={errors.sub_product_category_id}
                                    selectOptionProps={{
                                        name: "sub_product_category_id",
                                        value: data.sub_product_category_id,
                                        onChange: (e: any) => {
                                            setData({
                                                ...data,
                                                sub_product_category_id:
                                                    e.target.value,
                                            });
                                        },
                                    }}
                                />
                                <div className="flex flex-col gap-3 mt-2 text-sm">
                                    <Label
                                        variant="wajib"
                                        htmlFor="description"
                                    >
                                        Deskripsi Produk
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
                                </div>
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
