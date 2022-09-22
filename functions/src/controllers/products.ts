/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { db } from "../config/firebase";
import { RequestQueryProducts } from "./types";

import { formatDataProducts } from '../models/products'
import * as producstShoes1 from "../models/data/shoes_1.json";

const create = async (req: Request, res: Response) => {
  try {
    const batch = db.batch();
    producstShoes1.forEach((doc: any) => {
      const docRef = db.collection("products").doc(); // automatically generate unique id
      batch.set(docRef, doc);
    });

    await batch.commit();

    res.status(200).send({
      status: "success",
      message: "order added successfully",
      data: producstShoes1.length,
    });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getProductsBrands = async (req: Request, res: Response) => {
  try {
    const products = db.collection("products");
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

const getProductsCategories = async (req: Request, res: Response) => {
  try {
    const products = db.collection("products");
    const snapshot = await products.get();

    // @ts-ignore
    const data: any = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    const categories = data.reduce((previous: string[], { type }: any) => {
      if (!previous.includes(type)) {
        previous.push(type);
      }
      return previous;
    }, []).sort((c1: string, c2: string) => c1 < c2 ? -1 : 1);

    res.status(200).json({
      status: "success",
      // @ts-ignore
      categories,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getProducts = async (req: RequestQueryProducts, res: Response) => {
  try {
    console.log("req", req.query);
    const { categories: categoriesQuery, last } = req.query;
    const filteredBrands = categoriesQuery !== "ALL" ? categoriesQuery.split("&") : [];

    const productsRef = db.collection("products");
    let queryProducts = productsRef.orderBy("id");
    if (filteredBrands.length > 0) {
      queryProducts = queryProducts.where("brand", "in", filteredBrands);
    }

    if (last) {
      const lastSnapshot = await db.collection("products").doc(last).get();
      queryProducts = queryProducts.startAfter(lastSnapshot);
    }

    if (filteredBrands.length === 0) {
      queryProducts = queryProducts.limit(20);
    }
    const snapshot = await queryProducts.get();
    // @ts-ignore
    const rawProducts: any = [];
    snapshot.forEach((doc) => {
      rawProducts.push({
        idDocument: doc.id,
        ...doc.data(),
      });
    });

    const products = rawProducts.map(formatDataProducts);

    console.log("rawProducts.length", rawProducts.length);
    const lastDocument = (rawProducts.length > 1 && filteredBrands.length === 0) ?
      rawProducts[rawProducts.length - 1] :
      undefined;

    res.status(200).json({
      // @ts-ignore
      products,
      last: lastDocument?.idDocument,
      size: products.length,
    });
  } catch (error) {
    // @ts-ignore
    console.log("err", error);
    res.status(500).json(error.message);
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const productsRef = db.collection("products");
    const queryProducts = productsRef.where("id", "==", id);
    const snapshot = await queryProducts.get();
    // @ts-ignore
    const rawProducts: any = [];
    snapshot.forEach((doc) => {
      rawProducts.push({
        ...doc.data(),
      });
    });

    const product = rawProducts
      .map(formatDataProducts)
      .reduce((acc: any, current: any) => {
        acc = current
        return acc
      }, {})

    res.status(200).json({
      // @ts-ignore
      product,
    });
  } catch (error) {
    // @ts-ignore
    console.log("err", error);
    res.status(500).json(error.message);
  }
}

export {
  create,
  getProduct,
  getProducts,
  getProductsBrands,
  getProductsCategories,
};
