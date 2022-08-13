import * as admin from "firebase-admin";
import setIconValidationSchema from "./validation/setIconGroupValidationSchema";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import { TIconGroupSnapshot } from "./types";

/**
 * Create or update existing "icon" resource
 * @param {TRequestBody<TIconGroupSnapshot>} req
 * @param {TResponse<TIconGroupSnapshot | null>} res
 */
async function setIconsGroup(
  req: TRequestBody<TIconGroupSnapshot>,
  res: TResponse<TResponseData<TIconGroupSnapshot | null>>
) {
  const data = req.body;

  const { value: validData, error } = setIconValidationSchema.validate({
    ...data.data,
  });

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    if (validData.id) {
      await admin
        .firestore()
        .collection("icons")
        .doc(validData.id)
        .update(validData);

      return res.send({
        error: false,
        data: { id: data.id, ...validData },
        message: "Day updated",
      });
    } else {
      const newDay = await admin.firestore().collection("icons").add(validData);
      return res.send({
        error: false,
        data: {
          id: newDay.id,
          ...validData,
        },
        message: "Day created",
      });
    }
  } catch (e) {
    console.log("Day generation error: ", e);
    return res.send({
      error: true,
      message: "Something went wrong!",
    });
  }
}

export default setIconsGroup;
