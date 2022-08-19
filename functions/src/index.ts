import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import useMiddlewares from "./middlewares";
import { routes } from "./routes";

admin.initializeApp(functions.config().firebase);

const app = express();

useMiddlewares(app);

app.use("/v2/", routes);

export const api = functions.https.onRequest(app);
