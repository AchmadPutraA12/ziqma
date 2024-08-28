import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { CircleX, ImageIcon } from "lucide-react";
import InputError from "@/Components/InputError";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import { PageProps } from "@/types";
import Spinner from "@/Components/Spinner";

const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            image: null as File | null,
            product_color_id: "",
            room_id: "",
        });

    const { rooms, productWithProductColor } = usePage<PageProps>().props;

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
    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.product-room-mockup.store"), {
            forceFormData: true,
            onSuccess: () => reset("image"),
            preserveScroll: true,
        });
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6 p-4 bg-gray-50 border rounded-lg lg:w-4/5"
            >
                <SelectOptionCustom
                    variant="wajib"
                    optionName="Pilih Ruangan"
                    htmlFor="room_id"
                    labelName="Ruangan"
                    optionMap={rooms.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        );
                    })}
                    errors={errors.room_id}
                    selectOptionProps={{
                        name: "room_id",
                        value: data.room_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                room_id: e.target.value,
                            });
                        },
                    }}
                />{" "}
                <SelectOptionCustom
                    variant="wajib"
                    optionName="Pilih Warna Produk"
                    htmlFor="product_color_id"
                    labelName="Warna Produk"
                    optionMap={productWithProductColor.map((item, index) => {
                        return (
                            <optgroup label={item.name} key={index}>
                                {item.product_colors?.map((item, index) => {
                                    return (
                                        <option value={item.id} key={index}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </optgroup>
                        );
                    })}
                    errors={errors.product_color_id}
                    selectOptionProps={{
                        name: "product_color_id",
                        value: data.product_color_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                product_color_id: e.target.value,
                            });
                        },
                    }}
                />
                <div className="flex  gap-4 w-full">
                    <div
                        className={`flex flex-col gap-2 mt-2 ${
                            data.image ? "w-1/2" : "w-full"
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
