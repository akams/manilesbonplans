import * as Types from '@Types'

export type Props = {
    setImageToBeNotified: React.Dispatch<any>;
    products: Types.ClothesProduct[];
    refetchWishlist: any;
}