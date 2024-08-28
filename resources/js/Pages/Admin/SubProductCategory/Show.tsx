import { Label } from "@/Components/ui/label";
import AdminLayout from "@/Layouts/AdminLayout";
import { formatDate } from "@/lib/FormatDate";
import sanitizeAndValidateHTML from "@/lib/SanitizeHTML";
import { SubProductCategory } from "@/types";
import { Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

interface ShowProps {
    subProductCategory: SubProductCategory;
}
const Show = ({ subProductCategory }: ShowProps) => {
    return (
        <AdminLayout
            head="detail kategori produk"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Sub Kategori Produk dengan lebih efisien."
            tittleHead="Manajemen Sub Kategori Produk"
        >
            <div className="w-full flex justify-center items-center mt-10">
                <ul
                    style={{ listStyle: "initial" }}
                    className="w-auto px-8 relative pb-8 py-14 gap-2 flex flex-col bg-gray-50 border border-gray-400 rounded-lg"
                >
                    <Link
                        preserveState
                        preserveScroll
                        className="flex left-4 top-4 items-center gap-1 absolute"
                        href={route("admin.sub-product-category.index")}
                    >
                        <ChevronLeft className="w-6 h-6" />
                        <span className="text-sm mb-[1px]">Kembali</span>
                    </Link>
                    <img
                        src={
                            window.location.origin +
                            "/storage/" +
                            subProductCategory.image
                        }
                        className="rounded-lg size-80 object-cover"
                        alt=""
                    />
                    <li>
                        {" "}
                        <div className="flex flex-col gap-2 ">
                            <Label>Nama kategori produk : </Label>
                            <Label>{subProductCategory.name}</Label>
                        </div>
                    </li>
                    <li>
                        {" "}
                        <div className="flex flex-col gap-2">
                            <Label>Deskrpisi kategori produk : </Label>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeAndValidateHTML(
                                        subProductCategory.description
                                    ),
                                }}
                            ></div>
                        </div>
                    </li>
                    <li>
                        {" "}
                        <div className="flex flex-col gap-2">
                            <Label>Tanggal dibuat : </Label>
                            <Label>
                                {formatDate(subProductCategory.created_at)}
                            </Label>
                        </div>
                    </li>
                </ul>
            </div>
        </AdminLayout>
    );
};

export default Show;
