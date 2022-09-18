/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {db} from "../config/firebase";

import {RequestCreateOrder} from "./types";

const create = async (req: RequestCreateOrder, res: Response) => {
  try {
    const {uid} = req.user;
    console.log("req;user", req.user);
    console.log("req;Biyd", req.body);

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

export {create};
