import * as admin from "firebase-admin";
import { TDay } from "../../../types/day";
import { findDayInCollection } from "./getOrCreateDay";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import setDayValidationSchema from "./validation/setDayValidationSchema";

type TDaySnapshot = TDay | null;

/**
 * Create or update existing "day" resource
 * @param {TRequestBody<TDaySnapshot>} req
 * @param {TResponse<TResponseData<TDaySnapshot | null>>} res
 */
async function setDay(
  req: TRequestBody<TDaySnapshot>,
  res: TResponse<TResponseData<TDaySnapshot | null>>
) {
  const data = req.body;
  const uid = req?.user?.uid;

  console.log(data);

  if (!uid) {
    return res.json({
      error: true,
      message: "Insufficient permissions",
    });
  }

  const { value: validData, error } = setDayValidationSchema.validate({
    ...data.data,
  });

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    const day: TDaySnapshot = await findDayInCollection(uid, validData.date);

    if (day) {
      await admin.firestore().collection("days").doc(day.id).update(validData);

      return res.send({
        error: false,
        data: { id: day.id, ...validData },
        message: "Day updated",
      });
    } else {
      const newDay = await admin.firestore().collection("days").add(validData);
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

export default setDay;
