import {Response} from "express";
import {db} from "../config/firebase";
import {RequestSignup} from "./types";

const signup = async (req: RequestSignup, res: Response) => {
  const {uid, name, email} = req.body;
  try {
    const userAccount = db.collection(uid).doc("account");
    const userWishlist = db.collection(uid).doc("wishlist");
    const userCart = db.collection(uid).doc("cart");
    const userDraftOrdert = db.collection(uid).doc("draftOrder");

    const userObject = {
      account: {
        name,
        email,
        validate: true,
      },
      wishlist: {
        items: [],
      },
      cart: {
        items: [],
      },
      draftOrder: {
        items: [],
      },
    };

    userAccount.set(userObject.account);
    userWishlist.set(userObject.wishlist);
    userCart.set(userObject.cart);
    userDraftOrdert.set(userObject.draftOrder);

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
