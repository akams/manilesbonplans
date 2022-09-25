import { Response } from "express";
import { db } from "../../config/firebase";
import { RequestEnhance } from "../types";

import { formatDataProducts } from '../../models/products'

const _COLLECTION_SHOES_NAME = "shoes_products"

const getWishList = async (req: RequestEnhance, res: Response) => {
  try {
    console.log('Api: getWishList', req.user)
    // @ts-ignore
    const { uid } = req.user;
    const userWishlist = db.collection(uid).doc("wishlist");
    const snapshotUserWishlist = await userWishlist.get();
    // @ts-ignore
    const data = { ...snapshotUserWishlist.data() }
    const { items } = data
    console.log('items', items)

    const ids = items.map(({ itemId }: any) => itemId)
    let products = []
    // ---- recupère les données de la wishlist
    if (ids.length > 0) {
      const productShoessRef = db.collection(_COLLECTION_SHOES_NAME);
      const queryProductShoes = productShoessRef.where("id", "in", ids);
      const snapshotShoes = await queryProductShoes.get();
      // @ts-ignore
      const rawProducts: any = [];
      snapshotShoes.forEach((doc) => {
        rawProducts.push({
          ...doc.data(),
          type: 'shoes'
        });
      });

      products = rawProducts.map(formatDataProducts)
      products = products.reduce((accumulatorProducts: any, { id, ...product }: any) => {
        const found = items.find((item: any) => item.itemId === id)
        if (found) {
          const { itemId, ...rest } = found
          accumulatorProducts.push({
            ...product,
            ...rest,
            id,
          })
        }
        return accumulatorProducts
      }, [])
    }

    res.status(200).json({
      // @ts-ignore
      products,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
}

const removeWishlistItem = async (req: RequestEnhance, res: Response) => {
  console.log('Api: updateWishList')
  try {
    // @ts-ignore
    const { uid } = req.user;
    const { idProduct } = req.params;
    const userWishlist = db.collection(uid).doc("wishlist");
    const snapshotUserWishlist = await userWishlist.get();
    // @ts-ignore
    const data = { ...snapshotUserWishlist.data() }

    console.log('Start Transaction');
    await db.runTransaction(async (t) => {
      const removeIdFromWishlistItem = data.items.filter(({ itemId }: any) => itemId !== idProduct)
      t.update(userWishlist, { items: removeIdFromWishlistItem });
    });
    console.log('Transaction success!');

    res.status(200).json({ status: 'success' });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
}

export { getWishList, removeWishlistItem };
