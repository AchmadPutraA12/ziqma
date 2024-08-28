import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { SubProductCategory } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import { columns } from "./Partials/column";
import Create from "./Create";

interface Props {
    subProductCategories: SubProductCategory[];
}

const Index = ({ subProductCategories }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return (
            localStorage.getItem("defaultSubCategoryProduct") ||
            "addSubCategoryProduct"
        );
    });

    useEffect(() => {
        localStorage.setItem("defaultSubCategoryProduct", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="sub kategori produk"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Sub Kategori Produk dengan lebih efisien."
            tittleHead="Manajemen Sub Kategori Produk"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addSubCategoryProduct"
                        onClick={() =>
                            setDefaultValueTabs("addSubCategoryProduct")
                        }
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableSubCategoryProduct"
                        onClick={() =>
                            setDefaultValueTabs("tableSubCategoryProduct")
                        }
                    >
                        Tabel
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addSubCategoryProduct">
                    <Create />
                </TabsContent>
                <TabsContent value="tableSubCategoryProduct">
                    <DataTableCustom
                        data={subProductCategories}
                        columns={columns}
                    />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
