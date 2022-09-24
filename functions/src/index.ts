import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

import { validateFirebaseIdToken } from "./middlewares/middlewares";
import { admin } from "./config/firebase";

import { signup } from "./controllers/user";
import { getWishList, removeWishlistItem } from "./controllers/wishlist/wishlist";
import { create, getAll } from "./controllers/orders";
import {
  // create as createProduct,
  getProduct,
  getProducts,
  getProductsBrands,
  getProductsCategories,
} from "./controllers/products";

import {
  createProductShoes,
  getProductShoesCategories,
  getProductShoesBrands,
  getListProductShoes,
  getProductShoes,
} from './controllers/shoes/shoes'

const app = express(); // Handle intern API
const main = express(); // Expose API

// const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: true,
};

const useValidateFirebaseIdToken = validateFirebaseIdToken(admin);

main.use(cors(options));
main.use(express.json());
main.use(cookieParser());
main.use(useValidateFirebaseIdToken);
main.use(bodyParser.json());
main.use("/api/v1", app);

exports.mlbp = functions.https.onRequest(main);

app.get("/warmup", (_, response) => {
  response.json({
    msg: "Warming up serverless",
  });
});

app.post("/signup", signup);
// api wishlist
app.get("/wishlist", getWishList);
app.patch("/wishlist/remove/:idProduct", removeWishlistItem);
// api orders
app.get("/orders", getAll);
app.post("/orders/terminate", create);
// api products
app.get("/product/:id", getProduct);
app.get("/products", getProducts);
app.get("/products/brands", getProductsBrands);
app.post("/products/categories", getProductsCategories);

// api shoes product
app.get("/products/shoes", getListProductShoes);
app.get("/product/shoes/:id", getProductShoes);
app.get("/products/shoes/categories", getProductShoesCategories);
app.get("/products/shoes/brands", getProductShoesBrands);

// api admin
// look l'api que pour les admins
app.post("/admin/products", createProductShoes);
