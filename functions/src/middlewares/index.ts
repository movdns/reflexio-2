import { Application } from "express";
import secure from "./secure";
import validateFirebaseIdToken from "./auth/validateFirebaseIdToken";
import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
/**
 * Protect application from DDOS and XSS
 * @param {Request} app
 */
function useMiddlewares(app: Application) {
  secure(app);
  app.use(validateFirebaseIdToken);
}

export default useMiddlewares;
