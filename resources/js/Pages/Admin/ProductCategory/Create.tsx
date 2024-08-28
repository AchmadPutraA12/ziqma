import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { MenuSquareIcon } from "lucide-react";
import Spinner from "@/Components/Spinner";

const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: "",
        });

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.product-category.store"), {
            forceFormData: true,
            onSuccess: () => reset("name"),
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
                    labelFor="name"
                    labelText="Nama kategori produk"
                    error={errors && errors.name ? errors.name : ""}
                    inputId="name"
                    inputProps={{
                        value: data.name,
                        name: "name",
                        type: "text",
                        placeholder: "Masukkan nama kategori produk",
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
