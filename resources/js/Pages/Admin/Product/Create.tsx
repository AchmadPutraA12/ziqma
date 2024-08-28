import React, { useEffect, useState } from "react";
import InputTextLabel from "@/Components/InputTextLabel";
import TextEditor from "@/Components/TextEditor";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import {
    Calculator,
    CircleX,
    GanttChart,
    ImageIcon,
    MenuSquareIcon,
    PcCase,
    Tally3,
} from "lucide-react";
import InputError from "@/Components/InputError";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import { PageProps } from "@/types";
import Spinner from "@/Components/Spinner";
import RadioCustom from "@/Components/RadioCutom";
import NoImage from "../../../../../public/img/no_image.jpg";

interface CreateProps {
    onSuccess: (newTabValue: string) => void;
}

const Create: React.FC<CreateProps> = ({ onSuccess }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        image: null as File | null,
        thickness: "",
        range: "",
        pcs: "",
        sub_product_category_id: "",
        price: "",
        price_per_square_meter: "",
        width: "",
        height: "",
        type: "box",
    });
    const { subProductCategories } = usePage<PageProps>().props;

    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);

            setData({
                ...data,
                image: file,
            });
        }
    };

    useEffect(() => {
        if (data.description === "<p>Tidak ada deskripsi</p>") {
            setData((prevData) => ({
                ...prevData,
                image: NoImage as unknown as File,
            }));
            setPreviewImage(NoImage);
        } else {
            setPreviewImage(null);
            setData((prevData) => ({
                ...prevData,
                image: null,
            }));
        }
    }, [data.description]);

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
        const widthValue = parseFloat(data.width);
        const heightValue = parseFloat(data.height);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("admin.product.store"), {
            forceFormData: true,
            onSuccess: () => {
                reset("name", "image");
                onSuccess("someNewTabValue");
            },
            preserveScroll: true,
        });
    };

    const [stateHandleChangeType, setStateHandleChangeType] = useState(
        data.type
    );

    useEffect(() => {
        setStateHandleChangeType(data.type);

        return () => {
            setStateHandleChangeType(data.type);
        };
    }, [stateHandleChangeType]);

    const handleChangeType = (e: any) => {
        setData({
            ...data,
            type: e.target.value,
        });
        setStateHandleChangeType(e.target.value);
    };

    const value = [2, 4];
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6 p-4 bg-gray-50 border rounded-lg lg:w-4/5"
            >
                <InputTextLabel
                    variant="wajib"
                    labelFor="name"
                    labelText="Nama produk"
                    error={errors && errors.name ? errors.name : ""}
                    inputId="name"
                    inputProps={{
                        value: data.name,
                        name: "name",
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
                    <MenuSquareIcon className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>
                <div className="flex flex-col gap-3 mt-2">
                    <Label variant={"optional"} htmlFor="desc">
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
                    <InputError message={errors.description} />
                </div>
                <InputTextLabel
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
                            data.price_per_square_meter !== "" &&
                                !isNaN(
                                    data.price_per_square_meter as
                                    | string
                                    | number
                                    | any
                                )
                                ? parseInt(
                                    data.price_per_square_meter
                                ).toLocaleString("id-ID")
                                : "",
                        name: "price_per_square_meter",
                        type: "text",
                        placeholder: "Masukkan harga/m2",
                        onChange: (e: any) => {
                            const value = e.target.value.replace(/\D/g, "");
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
                </InputTextLabel>
                <InputTextLabel
                    variant="wajib"
                    labelFor="thickness"
                    labelText="Ketebalan"
                    error={errors && errors.thickness ? errors.thickness : ""}
                    inputId="thickness"
                    inputProps={{
                        value: data.thickness,
                        name: "thickness",
                        type: "text",
                        placeholder: "Masukkan ketebalan (3 mm)",
                        onChange: (e) => {
                            setData({
                                ...data,
                                thickness: e.target.value,
                            });
                        },
                    }}
                >
                    <Tally3 className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>
                <RadioCustom
                    title="Tipe Produk"
                    selectedGender={data.type}
                    onChange={handleChangeType}
                />
                {errors.type && (
                    <InputError message={errors.type} className="mt-2" />
                )}{" "}
                {stateHandleChangeType === "box" ? (
                    <div className=" p-4 border flex flex-col gap-3 rounded-lg bg-yellow-200">
                        {" "}
                        <InputTextLabel
                            variant="wajib"
                            labelFor="price"
                            labelText="Harga/box"
                            error={errors && errors.price ? errors.price : ""}
                            inputId="price"
                            inputProps={{
                                value:
                                    data.price !== "" &&
                                        !isNaN(data.price as string | number | any)
                                        ? parseInt(data.price).toLocaleString(
                                            "id-ID"
                                        )
                                        : "",
                                name: "price",
                                type: "text",
                                placeholder: "Masukkan harga/box",
                                onChange: (e: any) => {
                                    const value = e.target.value.replace(
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
                        </InputTextLabel>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <InputTextLabel
                                variant="wajib"
                                labelFor="pcs"
                                labelText="Pcs"
                                error={errors && errors.pcs ? errors.pcs : ""}
                                inputId="pcs"
                                inputProps={{
                                    value: data.pcs,
                                    name: "pcs",
                                    type: "number",
                                    placeholder: "Masukkan pcs (20 pcs)",
                                    onChange: handleChangePcs,
                                }}
                            >
                                <PcCase className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                            </InputTextLabel>

                            <InputTextLabel
                                variant="wajib"
                                labelFor="height"
                                labelText="Panjang"
                                error={
                                    errors && errors.height ? errors.height : ""
                                }
                                inputId="height"
                                inputProps={{
                                    value: data.height,
                                    name: "height",
                                    type: "number",
                                    placeholder: "20",
                                    onChange: handleChangeHeightBox,
                                }}
                            >
                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                    P
                                </span>{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    cm
                                </span>
                            </InputTextLabel>
                            <InputTextLabel
                                variant="wajib"
                                labelFor="width"
                                labelText="Lebar"
                                error={
                                    errors && errors.width ? errors.width : ""
                                }
                                inputId="width"
                                inputProps={{
                                    value: data.width,
                                    name: "width",
                                    type: "number",
                                    placeholder: "20",
                                    onChange: handleChangeWidthBox,
                                }}
                            >
                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                    L
                                </span>{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    cm
                                </span>
                            </InputTextLabel>

                            <InputTextLabel
                                labelFor="range"
                                labelText="Jangkauan"
                                error={
                                    errors && errors.range ? errors.range : ""
                                }
                                inputId="range"
                                inputProps={{
                                    disabled: true,
                                    value: data.range,
                                    name: "range",
                                    type: "text",
                                    placeholder: "hasil dari P x L x Pcs",
                                }}
                            >
                                <GanttChart className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    m2
                                </span>
                            </InputTextLabel>
                        </div>
                    </div>
                ) : (
                    <div className=" p-4 border flex flex-col gap-3 rounded-lg bg-yellow-200">
                        {" "}
                        <InputTextLabel
                            variant="wajib"
                            labelFor="price"
                            labelText="Harga/Roll"
                            error={errors && errors.price ? errors.price : ""}
                            inputId="price"
                            inputProps={{
                                value:
                                    data.price !== "" &&
                                        !isNaN(data.price as string | number | any)
                                        ? parseInt(data.price).toLocaleString(
                                            "id-ID"
                                        )
                                        : "",
                                name: "price",
                                type: "text",
                                placeholder: "Masukkan harga/roll",
                                onChange: (e: any) => {
                                    const value = e.target.value.replace(
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
                        </InputTextLabel>
                        <div className="flex items-center flex-col md:flex-row md:items-center gap-2">
                            <InputTextLabel
                                variant="wajib"
                                labelFor="height"
                                labelText="Panjang"
                                error={
                                    errors && errors.height ? errors.height : ""
                                }
                                inputId="height"
                                inputProps={{
                                    value: data.height,
                                    name: "height",
                                    type: "text",
                                    placeholder: "20",
                                    onChange: handleChangeHeightRoll,
                                }}
                            >
                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                    P
                                </span>{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    m
                                </span>
                            </InputTextLabel>

                            {/* <InputTextLabel
                                labelFor="width"
                                labelText="Lebar"
                                error={
                                    errors && errors.width ? errors.width : ""
                                }
                                inputId="width"
                                inputProps={{
                                    value: data.width,
                                    name: "width",
                                    type: "number",
                                    placeholder: "20",
                                    onChange: handleChangeWidthRoll,
                                }}
                            >
                                <span className="size-5 text-gray-600 absolute z-10 top-2  left-2.5">
                                    L
                                </span>{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    m
                                </span>
                            </InputTextLabel> */}
                            <div className="mt-1">
                                <SelectOptionCustom
                                    variant="wajib"
                                    optionName="pilih lebar"
                                    htmlFor="product_id"
                                    labelName="Lebar"
                                    optionMap={value.map((item, index) => {
                                        return (
                                            <option
                                                value={item.valueOf()}
                                                key={index}
                                            >
                                                {item.valueOf()} m
                                            </option>
                                        );
                                    })}
                                    errors={errors.width}
                                    selectOptionProps={{
                                        value: data.width,
                                        name: "width",
                                        type: "number",

                                        onChange: handleChangeWidthRoll,
                                    }}
                                />
                            </div>

                            <InputTextLabel
                                labelFor="range"
                                labelText="Ukuran Roll"
                                error={
                                    errors && errors.range ? errors.range : ""
                                }
                                inputId="range"
                                inputProps={{
                                    disabled: true,
                                    value: data.range,
                                    name: "range",
                                    type: "text",
                                    placeholder: "hasil dari P x L ",
                                }}
                            >
                                <GanttChart className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />{" "}
                                <span className="size-5 text-gray-600 absolute z-10 top-2  right-2.5">
                                    m2
                                </span>
                            </InputTextLabel>
                        </div>
                    </div>
                )}
                <SelectOptionCustom
                    variant="wajib"
                    optionName="Pilih Sub Kategori Produk"
                    htmlFor="sub_product_category_id"
                    labelName="Sub Kategori Produk"
                    optionMap={subProductCategories.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        );
                    })}
                    errors={errors.sub_product_category_id}
                    selectOptionProps={{
                        name: "sub_product_category_id",
                        value: data.sub_product_category_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                sub_product_category_id: e.target.value,
                            });
                        },
                    }}
                />
                <div className="flex gap-4 w-full">
                    <div
                        className={`flex flex-col gap-2 mt-2 ${data.image ? "w-1/2" : "w-full"
                            }`}
                    >
                        <span className="text-sm">
                            Foto <span className="text-red-500">*</span>
                        </span>
                        <label
                            htmlFor="image"
                            className="flex items-center cursor-pointer gap-2 hover:bg-slate-100 transform duration-300 flex-col justify-center p-16 bg-white border border-dashed rounded-lg border-gray-500"
                        >
                            <input
                                type="file"
                                id="image"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <>
                                <ImageIcon className="size-16 text-gray-400" />
                                <span className="text-gray-400 font-medium">
                                    Upload Gambar (JPG, PNG, atau GIF)
                                </span>
                            </>
                        </label>
                    </div>

                    {data.image && (
                        <>
                            <div className="flex flex-col gap-2 mt-2 w-1/2">
                                <span className="text-sm">Preview File</span>
                                <div className="flex items-center rounded-xl justify-between p-2 border bg-white">
                                    <div className="flex items-center gap-3  rounded-xl ">
                                        {previewImage && (
                                            <img
                                                className="size-24 object-cover rounded-xl "
                                                src={previewImage}
                                                alt=""
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            <p>{data.image.name}</p>
                                            <p>{data.image.size} bytes</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewImage(null);
                                            setData({
                                                ...data,
                                                image: null,
                                            });
                                            const fileInput =
                                                document.getElementById(
                                                    "image"
                                                ) as HTMLInputElement;
                                            if (fileInput) {
                                                fileInput.value = "";
                                            }
                                        }}
                                    >
                                        <CircleX className="size-6 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <InputError message={errors.image} />
                <div className="flex items-center justify-end gap-2 ">
                    <Button
                        type="reset"
                        variant={"outline"}
                        size={"lg"}
                        className=" border-black"
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        variant={"default"}
                        size={"lg"}
                    >
                        {processing ? <Spinner /> : <span>Simpan</span>}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Create;
