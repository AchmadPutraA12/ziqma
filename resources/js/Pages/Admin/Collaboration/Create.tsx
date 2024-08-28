import React, { useState } from "react";
import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { CircleX, ImageIcon, MenuSquare } from "lucide-react";
import InputError from "@/Components/InputError";
import Spinner from "@/Components/Spinner";

const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: "",
            image: null as File | null,
        });

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
        post(route("admin.collaboration.store"), {
            forceFormData: true,
            onSuccess: () => reset("name", "image"),
            preserveScroll: true,
        });
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-6 p-4 bg-gray-50 border rounded-lg lg:w-4/5"
            >
                <InputTextLabel
                    variant={"wajib"}
                    labelFor="name"
                    labelText="Nama kolaborasi"
                    error={errors && errors.name ? errors.name : ""}
                    inputId="name"
                    inputProps={{
                        value: data.name,
                        name: "name",
                        type: "text",
                        placeholder: "Masukkan nama kolaborasi",
                        onChange: (e) => {
                            setData({
                                ...data,
                                name: e.target.value,
                            });
                        },
                    }}
                >
                    <MenuSquare className="size-5 text-gray-600 absolute z-10 top-2.5  left-2.5" />
                </InputTextLabel>

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
