import AdminLayout from "@/Layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Collaboration,
    ProductCategory,
    ProductColor,
    ProductRoomMockup,
    Products,
    Rooms,
    SubProductCategory,
} from "@/types";
import { DataTableCustom } from "@/Components/DataTableCustom";
import { columnProductCategory } from "./Partials/columnProductCategory";
import { useEffect, useState } from "react";
import { columnsSubProductCategory } from "./Partials/columnSubProductCategory";
import { columnProduct } from "./Partials/columnProduct";
import { columnProductColor } from "./Partials/columnProductColor";
import { columnsRoom } from "./Partials/columnRoom";
import { columnProductRoomMockup } from "./Partials/columnProductRoomMockup";
import { columnCollaboration } from "./Partials/columnCollaboration";

interface Props {
    productCategoryTrash: ProductCategory[];
    subProductCategoryTrash: SubProductCategory[];
    productTrash: Products[];
    productColorTrash: ProductColor[];
    roomTrash: Rooms[];
    productRoomMockupTrash: ProductRoomMockup[];
    collaborationTrash: Collaboration[];
}

const Index = ({
    productCategoryTrash,
    subProductCategoryTrash,
    productTrash,
    productColorTrash,
    roomTrash,
    productRoomMockupTrash,
    collaborationTrash,
}: Props) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return (
            localStorage.getItem("defaultValueTabsBackup") ||
            "backupProductCategory"
        );
    });

    useEffect(() => {
        localStorage.setItem("defaultValueTabsBackup", defaultValueTabs);
    }, [defaultValueTabs]);

    return (
        <Tabs defaultValue={defaultValueTabs} className="mt-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-7 gap-4 h-14 w-full md:h-12">
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("backupProductCategory")}
                    value="backupProductCategory"
                    className="relative pr-6"
                >
                    Kategori Produk
                    {productCategoryTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                productCategoryTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {productCategoryTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() =>
                        setDefaultValueTabs("backupSubProductCategory")
                    }
                    value="backupSubProductCategory"
                    className="relative pr-6 ml-2"
                >
                    Sub Kategori Produk
                    {subProductCategoryTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                subProductCategoryTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {subProductCategoryTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("backupProduct")}
                    value="backupProduct"
                    className="relative pr-6 ml-2"
                >
                    Produk
                    {productTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                productTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {productTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("backupProductColor")}
                    value="backupProductColor"
                    className="relative pr-6 ml-2"
                >
                    Warna Produk
                    {productColorTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                productColorTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {productColorTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("backupRoom")}
                    value="backupRoom"
                    className="relative pr-6 ml-2"
                >
                    Ruangan
                    {roomTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                roomTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {roomTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() =>
                        setDefaultValueTabs("backupProductRoomMockup")
                    }
                    value="backupProductRoomMockup"
                    className="relative pr-6 ml-2"
                >
                    Product Room Mockup
                    {productRoomMockupTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                productRoomMockupTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {productRoomMockupTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("backupCollaboration")}
                    value="backupCollaboration"
                    className="relative pr-6 ml-2"
                >
                    Kolaborasi
                    {collaborationTrash.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${
                                collaborationTrash.length <= 9
                                    ? "p-1 px-2.5"
                                    : "p-1 px-1.5"
                            }`}
                        >
                            {collaborationTrash.length}
                        </div>
                    ) : null}
                </TabsTrigger>
            </TabsList>
            <TabsContent
                value="backupProductCategory"
                className="mt-32 lg:mt-0"
            >
                <DataTableCustom
                    data={productCategoryTrash}
                    columns={columnProductCategory}
                />
            </TabsContent>
            <TabsContent
                value="backupSubProductCategory"
                className="mt-32 lg:mt-0"
            >
                <DataTableCustom
                    data={subProductCategoryTrash}
                    columns={columnsSubProductCategory}
                />
            </TabsContent>
            <TabsContent value="backupProduct" className="mt-32 lg:mt-0">
                <DataTableCustom data={productTrash} columns={columnProduct} />
            </TabsContent>
            <TabsContent value="backupProductColor" className="mt-32 lg:mt-0">
                <DataTableCustom
                    data={productColorTrash}
                    columns={columnProductColor}
                />
            </TabsContent>
            <TabsContent value="backupRoom" className="mt-32 lg:mt-0">
                <DataTableCustom data={roomTrash} columns={columnsRoom} />
            </TabsContent>
            <TabsContent
                value="backupProductRoomMockup"
                className="mt-32 lg:mt-0"
            >
                <DataTableCustom
                    data={productRoomMockupTrash}
                    columns={columnProductRoomMockup}
                />
            </TabsContent>
            <TabsContent value="backupCollaboration" className="mt-32 lg:mt-0">
                <DataTableCustom
                    data={collaborationTrash}
                    columns={columnCollaboration}
                />
            </TabsContent>
        </Tabs>
    );
};

Index.layout = (page: any) => (
    <AdminLayout
        children={page}
        head="backup"
        tittleDesc="Terhubung dengan berbagai fitur dan pengaturan untuk Backup data Database."
        tittleHead="Manajemen Backup Data"
    />
);

export default Index;
