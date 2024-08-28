import InputTextLabelEdit from "@/Components/InputTextLabelEdit";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { ProductCategory } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { DoorOpen, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface EditProps {
    category_product: ProductCategory;
}

const Edit = ({ category_product }: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, errors, processing, reset } = useForm({
        name: category_product.name,
    });
    useEffect(() => {
        setData({
            ...data,
            name: category_product.name,
        });
    }, [category_product]);

    const submit = (e: any) => {
        e.preventDefault();
        router.post(
            route("admin.product-category.update", category_product.id),
            {
                ...data,
                _method: "put",
                forceFormData: true,
            },
            {
                preserveScroll: true,
                onSuccess: () => setShowModal(false),
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
