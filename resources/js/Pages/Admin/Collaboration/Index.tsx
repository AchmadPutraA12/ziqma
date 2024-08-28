import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Collaboration, ProductCategory, Products } from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { useEffect, useState } from "react";
import Create from "./Create";
import { columns } from "./Partials/column";

interface Props {
    collaborations: Collaboration[];
}

const Index = ({ collaborations }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return (
            localStorage.getItem("defaultCollaboration") || "addCollaboration"
        );
    });
    useEffect(() => {
        localStorage.setItem("defaultCollaboration", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="Kolaborasi"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Kolaborasi dengan lebih efisien."
            tittleHead="Manajemen Kolaborasi"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="addCollaboration"
                        onClick={() => setDefaultValueTabs("addCollaboration")}
                    >
                        Tambah
                    </TabsTrigger>
                    <TabsTrigger
                        value="tableCollaboration"
                        onClick={() =>
                            setDefaultValueTabs("tableCollaboration")
                        }
                    >
                        Tabel
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="addCollaboration">
                    <Create />
                </TabsContent>
                <TabsContent value="tableCollaboration">
                    <DataTableCustom columns={columns} data={collaborations} />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
