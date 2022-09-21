import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

// import {validateFirebaseIdToken} from "./middlewares/middlewares";
// import {admin} from "./config/firebase";

import {signup} from "./controllers/user";
import {create, getAll} from "./controllers/orders";
import {
  create as createProduct,
} from "./controllers/products";

const app = express(); // Handle intern API
const main = express(); // Expose API

// const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: true,
};

// const useValidateFirebaseIdToken = validateFirebaseIdToken(admin);

main.use(cors(options));
main.use(express.json());
main.use(cookieParser());
// main.use(useValidateFirebaseIdToken);
main.use(bodyParser.json());
main.use("/api/v1", app);

exports.mlbp = functions.https.onRequest(main);

app.get("/warmup", (request, response) => {
  response.json({
    msg: "Warming up serverless",
  });
});

app.post("/signup", signup);
app.get("/orders", getAll);
app.post("/orders/terminate", create);
app.post("/products", createProduct);

