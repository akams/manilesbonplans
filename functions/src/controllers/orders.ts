/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {db} from "../config/firebase";

import {RequestCreateOrder} from "./types";

const create = async (req: RequestCreateOrder, res: Response) => {
  try {
    const {uid} = req.user;
    const deliveryAddress = {
      ...req.body,
    };

    const draftOrder = db.collection(uid).doc("draftOrder");
    const doc = await draftOrder.get();

    const data = {
      userUID: uid,
      date: new Date(),
      status: "PENDING_ORDER",
      ...doc.data(),
    };
    const orders = db.collection("orders").doc();
    orders.set(data);

    // clean data cart and draftOrder
    const cart = db.collection(uid).doc("cart");
    cart.update({
      items: [],
    });
    draftOrder.update({
      items: [],
    });

    // update data account
    const account = db.collection(uid).doc("account");
    account.update({
      deliveryAddress,
    });

    res.status(200).send({
      status: "success",
      message: "order added successfully",
      data,
    });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

const getAll = async (req: any, res: Response) => {
  try {
    const {uid} = req.user;
    const orders = db.collection("orders").where("userUID", "==", uid);
    const snapshot = await orders.get();

    // @ts-ignore
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json({
      status: "success",
      // @ts-ignore
      data,
    });
  } catch (error) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

export {create, getAll};
