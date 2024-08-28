import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useEffect, useState } from "react";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { columns } from "./Partials/column";

interface Props {
    transaction: any;
}
const Index = ({ transaction }: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultTransaction") || "Transaction";
    });

    useEffect(() => {
        localStorage.setItem("defaultTransaction", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <AdminLayout
            head="transaksi"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        transaksi dengan lebih efisien."
            tittleHead="Manajemen Transaksi"
        >
            <Tabs defaultValue={defaultValueTabs} className="mt-6">
                <TabsList>
                    <TabsTrigger
                        value="Transaction"
                        onClick={() => setDefaultValueTabs("Transaction")}
                    >
                        Transaksi
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="Transaction">
                    <DataTableCustom data={transaction} columns={columns} />
                </TabsContent>
            </Tabs>
        </AdminLayout>
    );
};

export default Index;
