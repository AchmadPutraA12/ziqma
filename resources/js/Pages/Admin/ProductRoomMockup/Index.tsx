import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { ProductRoomMockup } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import Create from "./Create";
import { columns } from "./Partials/column";

interface Props {
    productRoomMockup: ProductRoomMockup[];
}

const Index = ({ productRoomMockup }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return (
            localStorage.getItem("defaultProductRoomMockup") ||
            "addProductRoomMockup"
        );
    });

    useEffect(() => {
        localStorage.setItem("defaultProductRoomMockup", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="produk dan gambar mockup"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Produk dan Gambar mockup dengan lebih efisien."
            tittleHead="Manajemen Produk dan Gambar mockup"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addProductRoomMockup"
                        onClick={() =>
                            setDefaultValueTabs("addProductRoomMockup")
                        }
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableProductRoomMockup"
                        onClick={() =>
                            setDefaultValueTabs("tableProductRoomMockup")
                        }
                    >
                        Tabel
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addProductRoomMockup">
                    <Create />
                </TabsContent>
                <TabsContent value="tableProductRoomMockup">
                    <DataTableCustom
                        data={productRoomMockup}
                        columns={columns}
                    />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
