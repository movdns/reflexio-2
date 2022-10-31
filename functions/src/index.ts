import { routes } from "./routes";
import * as express from "express";
import * as admin from "firebase-admin";
import useMiddlewares from "./middlewares";
import * as functions from "firebase-functions";

admin.initializeApp(functions.config().firebase);

const app = express();

useMiddlewares(app);

app.use("/v2/", routes);

export const api = functions.https.onRequest(app);
