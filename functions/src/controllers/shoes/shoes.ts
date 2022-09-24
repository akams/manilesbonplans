/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { db } from "../../config/firebase";
import { GlobalProduct, RequestQueryProducts } from "../types";

import { formatDataProducts } from '../../models/products'
import { getDefaultDataShoesSize } from '../../models/data/size.data'
import * as producstShoes1 from "../../models/data/shoes/shoes_1.json";

const _COLLECTION_NAME = "shoes_products"

const createProductShoes = async (req: Request, res: Response) => {
  try {
    console.log("Api: createShoesProduct");
    const shoesProduct: GlobalProduct[] = producstShoes1.map(({ price, ...product }: any) => {
      // price
      const [currency, amount] = price.split(" ");
      return {
        ...product,
        cloudTag: ['Baskets basses', 'Baskets'],
        gender: "Homme",
        size: getDefaultDataShoesSize(),
        amount: Number(amount.replace(",", ".")),
        currency,
        quantity: 5,
      }
    })
    const batch = db.batch();
    shoesProduct.forEach((doc: any) => {
      const docRef = db.collection(_COLLECTION_NAME).doc(); // automatically generate unique id
      batch.set(docRef, doc);
    });

    await batch.commit();

    res.status(200).send({
      status: "success",
      message: "initialize data successfully",
      data: shoesProduct.length,
    });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getProductShoesCategories = async (req: Request, res: Response) => {
  try {
    console.log("Api: getShoesProductsCategories");
    const shoesProducts = db.collection(_COLLECTION_NAME);
    const snapshot = await shoesProducts.get();

    // @ts-ignore
    const data: any = [];
    snapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
      });
    });

    const categories = data.reduce((previous: any, { cloudTag }: any) => {
      previous = previous.concat(cloudTag)
      return previous;
    }, [])
      .reduce((previous: string[], current: string) => {
        if (!previous.includes(current)) {
          previous.push(current);
        }
        return previous;
      }, [])
      .sort((c1: string, c2: string) => c1 < c2 ? -1 : 1);

    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getProductShoesBrands = async (req: Request, res: Response) => {
  try {
    console.log("Api: getShoesProductsBrands");
    const products = db.collection(_COLLECTION_NAME);
    const snapshot = await products.get();

    // @ts-ignore
    const data: any = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    const brands = data.reduce((previous: string[], { brand }: any) => {
      if (!previous.includes(brand)) {
        previous.push(brand);
      }
      return previous;
    }, []);

    res.status(200).json({
      status: "success",
      // @ts-ignore
      brands,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getProductShoes = async (req: RequestQueryProducts, res: Response) => {
  try {
    console.log("Api: getProductShoes", req.query);
    const { category, brands: brandsQuery, last } = req.query;
    const filteredBrands = brandsQuery !== "ALL" ? brandsQuery.split("&") : [];

    const productShoessRef = db.collection(_COLLECTION_NAME);
    let queryProductShoes = productShoessRef.orderBy("id");

    if (category !== 'ALL') {
      queryProductShoes = queryProductShoes.where("cloudTag", "array-contains", category);
    }

    if (filteredBrands.length > 0) {
      queryProductShoes = queryProductShoes.where("brand", "in", filteredBrands);
    }

    if (last) {
      const lastSnapshot = await db.collection(_COLLECTION_NAME).doc(last).get();
      queryProductShoes = queryProductShoes.startAfter(lastSnapshot);
    }

    if (filteredBrands.length === 0) {
      queryProductShoes = queryProductShoes.limit(20);
    }
    const snapshot = await queryProductShoes.get();
    // @ts-ignore
    const rawProducts: any = [];
    snapshot.forEach((doc) => {
      rawProducts.push({
        idDocument: doc.id,
        ...doc.data(),
      });
    });

    const productShoes = rawProducts.map(formatDataProducts);

    const lastDocument = (rawProducts.length > 1 && filteredBrands.length === 0) ?
      rawProducts[rawProducts.length - 1] :
      undefined;

    res.status(200).json({
      // @ts-ignore
      productShoes,
      last: lastDocument?.idDocument,
      size: productShoes.length,
    });
  } catch (error) {
    console.log("err", error);
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

export {
  createProductShoes,
  getProductShoesCategories,
  getProductShoesBrands,
  getProductShoes,
};
