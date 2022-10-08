import * as admin from "firebase-admin";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import { TSettings } from "./types";
// eslint-disable-next-line max-len
import setUserSettingsValidationSchema from "./validation/setUserSettingsValidationSchema";

const collectionDBName = "userSettings";

/**
 * Create or update existing "icon" resource
 * @param {TRequestBody<TSettings>} req
 * @param {TResponse<TSettings | null>} res
 */
async function setUserSettings(
  req: TRequestBody<TSettings>,
  res: TResponse<TResponseData<TSettings | null>>
) {
  const data = req.body;

  // Retrieve UID from session
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
      data: null,
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
