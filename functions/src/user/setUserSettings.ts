import * as admin from "firebase-admin";
import { TUserSettings } from "../../../types/userSettings";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import setUserSettingsValidationSchema from "./validation/setUserSettingsValidationSchema";

const collectionDBName: string =
  process.env.COLLECTION_USER_SETTINGS_DB_NAME || "userSettings";

/**
 * Update userSettings resource
 * @param {TRequestBody<TUserSettings>} req
 * @param {TResponse<TUserSettings | null>} res
 */
async function setUserSettings(
  req: TRequestBody<TUserSettings>,
  res: TResponse<TResponseData<TUserSettings | null>>
) {
  const data = req.body;

  // Retrieve UID from session
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
      message: "Insufficient permissions",
    });
  }

  const { value: validData, error } = setUserSettingsValidationSchema.validate({
    ...data.data,
  });

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    await admin
      .firestore()
      .collection(collectionDBName)
      .doc(uid)
      .update(validData);

    return res.send({
      error: false,
      data: { id: uid, ...validData },
      message: "Settings updated",
    });
  } catch (e) {
    console.log("Settings error: ", e);
    return res.send({
      error: true,
      message: "Something went wrong!",
    });
  }
}

export default setUserSettings;
