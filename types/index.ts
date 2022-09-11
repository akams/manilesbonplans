export type SignInFormData = {
    email: string;
    password: string;
}

export type SignUpFormData = {
    email: string;
    password: string;
    name: string;
}

export type ClothesProduct = {
    id: string;
    imageURL: string;
    brand: string;
    category: string;
    name: string;
    amount: string|number;
}

export type ProductsViewProps = {
    clothes: ClothesProduct[];
    brands: Array<String>;
    categories: Array<String>;
}

export type WishlistItemsType = {
    itemId: string;
    itemSize: string;
}
