import secure from "./secure";
import * as dayjs from "dayjs";
import { Application } from "express";
import * as customParseFormat from "dayjs/plugin/customParseFormat";
import validateFirebaseIdToken from "./auth/validateFirebaseIdToken";

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
