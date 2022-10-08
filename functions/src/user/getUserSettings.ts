import * as admin from "firebase-admin";
import { Request } from "express";
import { TResponse, TResponseData } from "../../types";
import { TSettings } from "./types";
import initialUserSettings from "./initialUserSettings";

const collectionDBName = "userSettings";

/**
 * Get single icons group
 * @param {TRequestBody} req
 * @param {TResponse<TResponseData<TSettings | null>>} res
 */
async function getUserSettings(
  req: Request,
  res: TResponse<TResponseData<TSettings | null>>
) {
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
      data: null,
      message: "Insufficient permissions",
    });
  }

  try {
    const userSettingsSnapshot = await admin
      .firestore()
      .collection(collectionDBName)
      .doc(uid)
      .get();

    if (userSettingsSnapshot.exists) {
      return res.send({
        error: false,
        data: userSettingsSnapshot.data(),
        message: "User settings retrieved!",
      });
    } else {
      await admin
        .firestore()
        .collection(collectionDBName)
        .doc(uid)
        .set(initialUserSettings);

      const newUserSettingsSnapshot = await admin
        .firestore()
        .collection(collectionDBName)
        .doc(uid)
        .get();

      return res.send({
        error: false,
        data: newUserSettingsSnapshot.data(),
        message: "User settings created!",
      });
    }
  } catch (e) {
    console.log("Retrieving user settings error: ", e);
    return res.send({
      error: true,
      message: "Something went wrong!",
    });
  }
}

export default getUserSettings;
