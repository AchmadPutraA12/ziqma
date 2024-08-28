export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface ProductCategory {
    created_at: string;
    deleted_at: string;

    id: string;
    description: string;
    image: string;
    name: string;
    updated_at: string;
    sub_product_categories: SubProductCategory[];
}

export interface SubProductCategory {
    id: string;
    name: string;
    image: string | null;
    description: string;
    slug: string;
    product_category_id: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    product_category: ProductCategory;
    products: Products[];
}

export interface Products {
    id: string;
    name: string;
    description: string;
    image: string | null;
    thickness: string;
    range: number;
    slug: string;
    pcs?: number;
    price: number;
    has_colors: boolean;
    has_mockups: boolean;
    price_per_square_meter?: number;
    width?: number;
    height?: number;
    type: string;
    sub_product_category_id: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    imageColorState: ProductColor;
    sub_product_category: SubProductCategory;
    product_colors?: ProductColor[];
}

export interface ProductColor {
    id: string;
    name: string;
    image: string;
    // price_per_box: number;
    // price_per_square_meter: number;
    product_id: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    product: Products;
    product_room_mockup: ProductRoomMockup;
}

export interface Rooms {
    id: string;
    name: string;
    image: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    product_room_mockups: ProductRoomMockup[];
}

export interface ProductRoomMockup {
    id: string;
    name: string;
    image: string;
    product_color_id: string;
    room_id: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
    product_color: ProductColor;
    room: Rooms;
}

export interface Collaboration {
    id: string;
    name: string;
    image: string;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
}

interface Transaction {
    id: number;
    invoice: string;
    name: string;
    email: string;
    no_telp: string;
    address: string;
    status: string;
    amount: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    transaction_details: TransactionDetail[];
}

interface TransactionDetail {
    id: number;
    transaction_id: number;
    name_product: string;
    color_product: string;
    total: number;
    total_price: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

interface LaravelVisit {
    id: number;
    created_at: number;
    updated_at: number;
}

export interface ContactCenter {
    phone_number: string;
    created_at: string;
    id: number;
    updated_at: string;
}
export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success: string;
        error: string;
    };
    productCategories: ProductCategory[];
    subProductCategories: SubProductCategory[];
    product: Products[];
    rooms: Rooms[];
    productColor: ProductColor[];
    productWithProductColor: Products[];
    collaborations: Collaboration[];
    productCategory: ProductCategory[];
    contact: ContactCenter;
};
