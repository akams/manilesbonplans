import { Response } from "express";
import { db } from "../../config/firebase";
import { RequestEnhance } from "../types";

import { formatDataProducts } from '../../models/products'

const _COLLECTION_SHOES_NAME = "shoes_products"

const getCart = async (req: RequestEnhance, res: Response) => {
  try {
    console.log('Api: getCart', req.user)
    // @ts-ignore
    // const { uid } = req.user;
    const uid = 'fkBoljk5RfRTpvsjjP3DIlk5Dm82';
    const userCart = db.collection(uid).doc("cart");
    const snapshotUserCart = await userCart.get();
    // @ts-ignore
    const data = { ...snapshotUserCart.data() }
    const { items } = data
    console.log('items', items)

    const ids = items.map(({ itemId }: any) => itemId)
    let products = []
    // ---- recupère les données de la wishlist
    if (ids.length > 0) {
      const productShoesRef = db.collection(_COLLECTION_SHOES_NAME);
      const queryProductShoes = productShoesRef.where("id", "in", ids);
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

const removeCartItem = async (req: RequestEnhance, res: Response) => {
  console.log('Api: removeCartItem')
  try {
    // @ts-ignore
    const { uid } = req.user;
    const { idProduct } = req.params;
    const userCart = db.collection(uid).doc("cart");
    const snapshotUserWishlist = await userCart.get();
    // @ts-ignore
    const data = { ...snapshotUserWishlist.data() }

    console.log('Start Transaction');
    await db.runTransaction(async (transaction) => {
      const removeIdFromWishlistItem = data.items.filter(({ itemId }: any) => itemId !== idProduct)
      transaction.update(userCart, { items: removeIdFromWishlistItem });
    });
    console.log('Transaction success!');

    res.status(200).json({ status: 'success' });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
}

const updateCartItem = async (req: RequestEnhance, res: Response) => {
  console.log('Api: updateCartItem')
  try {
    // @ts-ignore
    const { uid } = req.user;
    const { updateItem } = req.body;
    const userCart = db.collection(uid).doc("cart");
    const snapshotUserWishlist = await userCart.get();
    // @ts-ignore
    const data = { ...snapshotUserWishlist.data() }

    console.log('Start Transaction');
    await db.runTransaction(async (transaction) => {
      const updateItemCart = data.items.reduce((acc: any, { itemId }: any) => {
        const found = updateItem.find((item: any) => item.itemId === itemId)
        if (found) {
          acc.push({
            ...found,
          })
        }
        return acc
      }, [])

      transaction.update(userCart, { items: updateItemCart });
    });
    console.log('Transaction success!');

    res.status(200).json({ status: 'success' });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
}

export { getCart, removeCartItem, updateCartItem };
