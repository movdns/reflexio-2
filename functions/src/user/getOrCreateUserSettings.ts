import { Request } from "express";
import * as admin from "firebase-admin";
import { TResponse, TResponseData } from "../../types";
import { TUserSettings } from "../../../types/userSettings";
import initialUserSettings from "../../../src/common/appConfig/initialUserSettings";

const collectionDBName: string =
  process.env.COLLECTION_USER_SETTINGS_DB_NAME || "userSettings";

/**
 * Get userSettings resource
 * @param {TRequestBody} req
 * @param {TResponse<TResponseData<TUserSettings | null>>} res
 */
async function getOrCreateUserSettings(
  req: Request,
  res: TResponse<TResponseData<TUserSettings | null>>
) {
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
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
      // Create new settings from initial data
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

export default getOrCreateUserSettings;
