/* eslint-disable max-len */
import {Request, Response} from "express";
import {db} from "../config/firebase";
// import {RequestSignup} from "./types";

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

// const getAll = async (req: Request, res: Response) => {
// }

export {create};
