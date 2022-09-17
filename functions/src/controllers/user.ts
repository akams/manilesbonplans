/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Response} from "express";
import {db} from "../config/firebase";
import {RequestSignup} from "./types";

const signup = async (req: RequestSignup, res: Response) => {
  const {uid, name, email} = req.body;
  try {
    const userAccount = db.collection(uid).doc("account");
    const userWishlist = db.collection(uid).doc("wishlist");
    const userCart = db.collection(uid).doc("cart");

    const userObject = {
      account: {
        name,
        email,
      },
      wishlist: {
        items: [],
      },
      cart: {
        items: [],
      },
    };

    userAccount.set(userObject.account);
    userWishlist.set(userObject.wishlist);
    userCart.set(userObject.cart);

    res.status(200).send({
      status: "success",
      message: "user init added successfully",
      data: userObject,
    });
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

export {signup};
