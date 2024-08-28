import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Products } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import Create from "./Create";
import { columns } from "./Partials/column";
import { columnsRoll } from "./Partials/columnRoll";

interface Props {
    products: Products[];
    productsRoll: Products[];
}

const Index = ({ products, productsRoll }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultProduct") || "addProduct";
    });

    const handleTabChange = (newTabValue: string) => {
        setDefaultValueTabs(newTabValue);
    };
    useEffect(() => {
        localStorage.setItem("defaultProduct", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="produk"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Produk dengan lebih efisien."
            tittleHead="Manajemen Produk"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addProduct"
                        onClick={() => setDefaultValueTabs("addProduct")}
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableProductBox"
                        onClick={() => setDefaultValueTabs("tableProductBox")}
                    >
                        Produk (Box)
                    </TabsTrigger>{" "}
                    <TabsTrigger
                        value="tableProductRoll"
                        onClick={() => setDefaultValueTabs("tableProductRoll")}
                    >
                        Produk (Roll)
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addProduct">
                    <Create onSuccess={handleTabChange} />
                </TabsContent>
                <TabsContent value="tableProductBox">
                    <DataTableCustom columns={columns} data={products} />
                </TabsContent>{" "}
                <TabsContent value="tableProductRoll">
                    <DataTableCustom
                        columns={columnsRoll}
                        data={productsRoll}
                    />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
