import * as admin from "firebase-admin";
import { findDayInCollection } from "./getDay";
import setDayValidationSchema from "./validation/setDayValidationSchema";
import { TDaySnapshot, TRequestBody, TResponse, TResponseData } from "../types";

// Create or update if exists
const setDay = async (
  req: TRequestBody<TDaySnapshot>,
  res: TResponse<TResponseData>
) => {
  const data = req.body;

  const { value: validData, error } = setDayValidationSchema.validate(data);

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    const day: TDaySnapshot = await findDayInCollection(data.date);

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
};

export default setDay;
