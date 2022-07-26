import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import * as cors from "cors";
import { routes } from "./routes";

dayjs.extend(customParseFormat);
admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({ origin: true }));

app.use("/v1/", routes);

export const api = functions.https.onRequest(app);
