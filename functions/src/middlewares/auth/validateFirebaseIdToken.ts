import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { NextFunction, Request, Response } from "express";

const validateFirebaseIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)
  ) {
    functions.logger.error("No Firebase ID token was passed");
    res.status(403).send("Unauthorized");
    return;
  }

  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send("Unauthorized");
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = await admin.auth().verifyIdToken(idToken);

    const role = req.user?.provider_id ? "anonymous" : "user";
    req?.user && (await grantUserRole(req.user.uid, role));

    console.log(req.user);

    next();
    return;
  } catch (error) {
    functions.logger.error("Error while verifying Firebase ID token:", error);
    res.status(403).send("Unauthorized");
    return;
  }
};

const grantUserRole = async (uid: string, role: string) => {
  const user = await admin.auth().getUser(uid);
  // console.log("grantUserRole", user);
  if (user.customClaims && user.customClaims.role === role) {
    return;
  }
  return admin.auth().setCustomUserClaims(user.uid, {
    role: [role],
  });
};

export default validateFirebaseIdToken;
