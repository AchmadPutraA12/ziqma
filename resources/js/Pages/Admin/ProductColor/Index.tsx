import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Products } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import { columns } from "./Partials/column";
import Create from "./Create";

interface Props {
    productColors: Products[];
}

const Index = ({ productColors }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultProductColor") || "addProductColor";
    });

    useEffect(() => {
        localStorage.setItem("defaultProductColor", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="warna produk"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Warna Produk dengan lebih efisien."
            tittleHead="Manajemen Warna Produk"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addProductColor"
                        onClick={() => setDefaultValueTabs("addProductColor")}
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableProductColor"
                        onClick={() => setDefaultValueTabs("tableProductColor")}
                    >
                        Tabel
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addProductColor">
                    <Create />
                </TabsContent>
                <TabsContent value="tableProductColor">
                    <DataTableCustom data={productColors} columns={columns} />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
