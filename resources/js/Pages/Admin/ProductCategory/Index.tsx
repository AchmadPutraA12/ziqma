import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import Create from "./Create";
import { ProductCategory } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { columns } from "./Partials/columns";
import { useEffect, useState } from "react";

interface Props {
    productCategories: ProductCategory[];
}

const Index = ({ productCategories }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultValueTabs") || "add";
    });

    useEffect(() => {
        localStorage.setItem("defaultValueTabs", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="kategori produk"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Kategori Produk dengan lebih efisien."
            tittleHead="Manajemen Kategori Produk"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList className="overflow-x-auto md:overflow-hidden">
                    <TabsTrigger
                        value="add"
                        onClick={() => setDefaultValueTabs("add")}
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="table"
                        onClick={() => setDefaultValueTabs("table")}
                    >
                        Tabel{" "}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="add">
                    <Create />
                </TabsContent>
                <TabsContent value="table">
                    <DataTableCustom
                        data={productCategories}
                        columns={columns}
                    />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
