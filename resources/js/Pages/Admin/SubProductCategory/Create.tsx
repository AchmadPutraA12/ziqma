import InputTextLabel from "@/Components/InputTextLabel";
import { Button } from "@/Components/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import { MenuSquareIcon } from "lucide-react";
import SelectOptionCustom from "@/Components/SelectOptionCustom";
import { PageProps } from "@/types";
import Spinner from "@/Components/Spinner";

const Create: React.FC = () => {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            name: "",

            product_category_id: "",
        });
    const { productCategories } = usePage<PageProps>().props;

    function handleSubmit(e: any) {
        e.preventDefault();
        post(route("admin.sub-product-category.store"), {
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
                    labelText="Nama sub kategori produk"
                    error={errors && errors.name ? errors.name : ""}
                    inputId="name"
                    inputProps={{
                        value: data.name,
                        name: "name",
                        type: "text",
                        placeholder: "Masukkan sub nama kategori produk",
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

                <SelectOptionCustom
                    optionName="Pilih Kategori Produk"
                    htmlFor="product_category_id"
                    labelName="Kategori Produk"
                    optionMap={productCategories.map((item, index) => {
                        return (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        );
                    })}
                    errors={errors.product_category_id}
                    selectOptionProps={{
                        name: "product_category_id",
                        value: data.product_category_id,
                        onChange: (e: any) => {
                            setData({
                                ...data,
                                product_category_id: e.target.value,
                            });
                        },
                    }}
                />

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
