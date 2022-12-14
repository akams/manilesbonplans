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
    emailVerified?: string;
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
    itemSize: string | null;
}

declare type CATEGORIES = 'CLOTHES' | 'SHOES' | 'ACCESSORIES';
/**
 * Key = taille , nb restant        
 * example {[44]: 3}, {[43]: 0}, {[42]: 5}
 * taille -> nb restant
 */
export type Size = {
    [key: number]: number;
}

export type Product = {
    id: string;
    imageURL: string;
    brand: string;
    category: string; // example: hoody ex categorie
    name: string;
    amount: string | number;
    bigCategorie?: CATEGORIES; // chaussure/Vetements/Accessoire
    size?: Size;
    quantity?: string | number;
}

// type SCHOES_PRODUCT = {
//     id,
//     name, // type tennis /
//     brand,
//     price,
//     oldPrice,
//     imgSrc,
//     cloudTag  // categorie;categorie_general;
//     gender
//     size
//     quantity
// }


// id
// photo
// marque
// old_price?
// price
// categorie ex: botte dhiver
// categorie_general ex: botte
// types ex: chaussure
// gender: femme

// cloud_tag: [
//     // categorie;categorie_general;
// ]
// ---------> bottes --> chaussure --> femme
// HOMME / FEMME / ENFANTS
// VETEMENT | CHAUSSURE | ACCESSOIRE |
// CHAUSSURE / HOMME|FEMME

export type ClothesProduct = {
    id: string;
    imageURL: string;
    brand: string;
    category: string;
    name: string;
    amount: string | number;
    size: Size;
    currency?: string | number;
    type?: string;
    itemSize?: string | null;
}

declare type STATUS_ORDERS = 'PENDING_ORDER' | 'ORDER_SENT' | 'SHIPPING_IN_PROGRESS' | 'DELIVERY_COMPLETED';

export type Order = {
    userUID: string;
    userName: string;
    totalPrice: number;
    items: Cart[];
    date?: Date;
    status?: STATUS_ORDERS;
}
