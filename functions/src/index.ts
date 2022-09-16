import * as functions from "firebase-functions";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";

const app = express(); // Handle intern API
const main = express(); // Expose API

// const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: true,
};

main.use(cors(options));
main.use(express.json());
main.use(cookieParser());
// // main.use(useValidateFirebaseIdToken);
main.use(bodyParser.json());
main.use("/api/v1", app);

exports.mlbp = functions.https.onRequest(main);

app.get("/", (req, res) => res.status(200).send("Hey there! 3"));

app.get("/warmup", (request, response) => {
  response.json({
    msg: "Warming up serverless 3.",
  });
});
