export type ProductsViewProps = {
    clothes: ClothesProduct[];
    brands: Array<string>;
    categories: Array<string>;
}

export type SignInFormData = {
    email: string;
    password: string;
}

export type SignUpFormData = {
    email: string;
    password: string;
    name: string;
}


export type SelectorTypes = {
    auth: ISelectorAuth;
    cart: ISelectorCart;
    wishlist: ISelectorWishlist;
    filter: ISelectorFilter;
}
interface ISelectorFilter {
    filter: FilterType;
}
export type FilterType = {
    brands: string[];
    categories: string[];
    sort: string;
}


interface ISelectorAuth {
    user: User;
}
export type User = {
    uid: string;
    email: string;
    name: string;
    clientId?: string;
    recommendBy?: string; // default BETA_USER_APP
    nbReco?: number;
    deliveryAddress?: UserAddress;
    billingAddress?: UserAddress;
    accessToken?: string;
}
export type UserAddress = {
    name: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    tel: string;
}

interface ISelectorCart {
    items: Cart[];
}
export type Cart = {
    itemId: string;
    itemQuantity: string;
    itemSize: string;
}

interface ISelectorWishlist {
    items: Wishlist[];
}
export type Wishlist = {
    itemId: string;
    itemSize: string|null;
}

declare type CATEGORIES = 'CLOTHES' | 'SHOES' | 'ACCESSORIES';
/**
 * Key = taille , nb restant        
 * example {[44]: 3}, {[43]: 0}, {[42]: 5}
 * taille -> nb restant
 */
type Size = {
    [key: number]: number;
}

export type Product = {
    id: string;
    imageURL: string;
    brand: string;
    type: string; // example: hoody ex categorie
    name: string;
    amount: string|number;
    categorie: CATEGORIES; // chaussure/Vetements/Accessoire
    size?: Size;
}

export type ClothesProduct = {
    id: string;
    imageURL: string;
    brand: string;
    category: string;
    name: string;
    amount: string|number;
    size?: string|null;
}

export type Order = {
    totalPrice: number;
    cart: Cart[];
    userId: string;
}
