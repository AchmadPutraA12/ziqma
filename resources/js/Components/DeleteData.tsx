import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "./ui/button";
import { AlertCircle, CircleXIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface Props {
    paramId: string;
}
const DeleteData = ({ paramId }: Props) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <Dialog onOpenChange={setShowModal} open={showModal}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setShowModal(true)}
                    variant={"outline"}
                    size={"sm"}
                    className=" hover:bg-red-100 border-red-500"
                >
                    <CircleXIcon className="h-4 w-4 text-red-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[90%] md:w-full ">
                <DialogHeader>
                    <DialogTitle className="mt-5">
                        Apakah anda yakin ingin menghapus?
                    </DialogTitle>
                    <div className="text-sm flex text-start">
                        Tindakan ini tidak bisa dibatalkan. Ini akan hapus data
                        anda, apakah anda yakin ingin melanjutkan ?
                    </div>
                    <div className="flex text-sm p-2 rounded-lg items-center gap-2 bg-yellow-50  border border-orange-300">
                        <AlertCircle className="size-10  md:size-6 text-orange-400" />
                        <span className="text-orange-700 text-start">
                            Jika anda yakin menghapus, data anda akan masuk ke
                            <span className="font-semibold">(backup data)</span>
                        </span>
                    </div>
                </DialogHeader>
                <div className="mt-4 flex items-center justify-end gap-4">
                    <Button
                        variant={"cancel"}
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white"
                        onClick={() => {
                            router.delete(`${paramId}`, {
                                preserveScroll: true,
                            });
                            setShowModal(false);
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteData;
