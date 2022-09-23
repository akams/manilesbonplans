import { Response } from "express";
import { db } from "../config/firebase";
import { RequestSignup } from "./types";


const signup = async (req: RequestSignup, res: Response) => {
  try {
    console.log("Api: signup");
    const { uid, name, email } = req.body;
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
      dataForUser: {
        items: [],
      },
    };
    userAccount.set(userObject.account);
    userWishlist.set(userObject.dataForUser);
    userCart.set(userObject.dataForUser);
    userDraftOrdert.set(userObject.dataForUser);

    res.status(200).json({ status: 'success' })
  } catch (error: unknown) {
    // @ts-ignore
    res.status(500).json(error.message);
  }
};

export { signup };
