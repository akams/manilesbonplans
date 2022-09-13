/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from '@Types'

export type Props = {
    product: Types.ClothesProduct
    openSizeChartHandler: () => void;
    size: string;
    setSize: React.Dispatch<any>;
    promptSize: boolean;
    isLoading: boolean;
    addToWishlistHandler: () => void;
    addToCartHandler: () => void;
    wishlistItems: Types.WishlistItemsType[]
}