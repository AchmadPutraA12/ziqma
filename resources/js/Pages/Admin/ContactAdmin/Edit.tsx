import InputError from "@/Components/InputError";
import Spinner from "@/Components/Spinner";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { ContactCenter } from "@/types";
import { useForm } from "@inertiajs/react";
import React from "react";

interface PageProps {
    contactCenter: ContactCenter;
}

const Edit = ({ contactCenter }: PageProps) => {
    const { data, setData, processing, errors, reset, put } = useForm({
        phone_number: contactCenter.phone_number,
    });

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        put(route("admin.contact-admin.update", contactCenter.id), {
            preserveScroll: true,
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Hanya mengizinkan angka
        if (/^\d*$/.test(value)) {
            setData("phone_number", value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(
                e.key
            )
        ) {
            return;
        }

        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <>
            {processing && <Spinner />}
            <form onSubmit={submit}>
                <div className="flex flex-col gap-2">
                    <Label variant="wajib" htmlFor="phone">
                        Nomor kontak center
                    </Label>
                    <Input
                        value={data.phone_number}
                        name="phone"
                        id="phone"
                        type="text"
                        placeholder="6281234567890"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <InputError message={errors.phone_number} />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        className="px-10"
                        variant={"outline"}
                        type="button"
                        onClick={() => reset()}
                    >
                        Reset
                    </Button>{" "}
                    <Button
                        type="submit"
                        className="px-10"
                        disabled={processing}
                    >
                        Ubah
                    </Button>
                </div>
            </form>
        </>
    );
};

export default Edit;
