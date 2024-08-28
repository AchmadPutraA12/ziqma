import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import GuestLayout from "./GuestLayout";

interface Props {
    children: React.ReactNode;
    head?: any;
}

export default function ProductLayout({ children, head }: Props) {
    const { productCategory, url } = usePage<PageProps>().props;

    return (
        <GuestLayout head={head}>
            <section className=" mt-24 lg:mt-32 md:px-16   flex container gap-5 px-4 lg:px-20 relative">
                <div className="w-1/4 hidden lg:block">
                    <div className="bg-white p-4 border sticky top-20 rounded-xl flex flex-col">
                        <h2 className="text-lg font-semibold">
                            Kategori Produk
                        </h2>
                        <hr className="my-3" />
                        <div className="flex flex-col gap-3">
                            {productCategory.map((item) => (
                                <div key={item.id}>
                                    <span className="font-medium">
                                        {item.name}
                                    </span>
                                    <div className="flex text-zinc-700 flex-col mt-2 ml-5 gap-1 text-sm">
                                        {item.sub_product_categories.map(
                                            (subItem) => (
                                                <Link
                                                    preserveState
                                                    className={` hover:text-blue-500 hover:underline ${
                                                        window.location
                                                            .pathname ===
                                                            `/produk/${subItem.slug}` ||
                                                        window.location.pathname.startsWith(
                                                            `/produk/${subItem.slug}/${item.id}`
                                                        )
                                                            ? "text-blue-700 font-medium"
                                                            : null
                                                    }`}
                                                    href={`/produk/${subItem.slug}`}
                                                    key={subItem.id}
                                                >
                                                    {subItem.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full">{children}</div>
            </section>
        </GuestLayout>
    );
}
