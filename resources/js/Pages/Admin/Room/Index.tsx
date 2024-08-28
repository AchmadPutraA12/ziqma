import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Rooms } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import Create from "./Create";
import { columns } from "./Partials/column";

interface Props {
    rooms: Rooms[];
}

const Index = ({ rooms }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultRoom") || "addRoom";
    });

    useEffect(() => {
        localStorage.setItem("defaultRoom", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="ruangan"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Ruangan dengan lebih efisien."
            tittleHead="Manajemen Ruangan"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addRoom"
                        onClick={() => setDefaultValueTabs("addRoom")}
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableRoom"
                        onClick={() => setDefaultValueTabs("tableRoom")}
                    >
                        Tabel
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addRoom">
                    <Create />
                </TabsContent>
                <TabsContent value="tableRoom">
                    <DataTableCustom data={rooms} columns={columns} />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
