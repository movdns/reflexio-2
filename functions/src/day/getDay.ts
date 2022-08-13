import * as admin from "firebase-admin";
import getDayValidationSchema from "./validation/getDayValidationSchema";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import { TDaySnapshot } from "./types";

const collectionDBName: string = process.env.COLLECTION_DB_NAME || "days";

const getDay = async (
  req: TRequestBody<{ date: string }>,
  res: TResponse<TResponseData<TDaySnapshot | null>>
) => {
  const date = req.params.date;
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
      data: null,
      message: "Insufficient permissions",
    });
  }

  const { value: validDate, error } = getDayValidationSchema.validate({
    date,
  });

  if (error) {
    return res.send({ error: true, message: error.message });
  }

  try {
    const day = await findDayInCollection(uid, validDate.date);

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
  uid: string,
  date: string
): Promise<TDaySnapshot> => {
  const dayQuerySnapshot = await admin
    .firestore()
    .collection(collectionDBName)
    .where("date", "==", date)
    .where("uid", "==", uid)
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
