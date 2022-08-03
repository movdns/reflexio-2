import * as admin from "firebase-admin";
import getDayValidationSchema from "./validation/getDayValidationSchema";
import { TDaySnapshot, TRequestBody, TResponse, TResponseData } from "../types";

const collectionDBName: string = process.env.COLLECTION_DB_NAME || "days";

const getDay = async (
  req: TRequestBody<{ date: string }>,
  res: TResponse<TResponseData>
) => {
  const date = req.params.date;

  const { value: validDate, error } = getDayValidationSchema.validate({
    date,
  });

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    const day = await findDayInCollection(validDate.date);

    if (day) {
      return res.send({
        error: false,
        data: day,
        message: "Day retrieved",
      });
    } else {
      return res.send({
        error: true,
        message: "Day not exists",
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

export const findDayInCollection = async (
  date: string
): Promise<TDaySnapshot> => {
  const dayQuerySnapshot = await admin
    .firestore()
    .collection(collectionDBName)
    .where("date", "==", date)
    .limit(1)
    .get();

  if (dayQuerySnapshot.size) {
    let daySnapshot: TDaySnapshot = null; // ???
    dayQuerySnapshot.forEach((doc) => {
      daySnapshot = { id: doc.id, ...doc.data() };
    });
    return daySnapshot;
  }

  return null;
};

export default getDay;
