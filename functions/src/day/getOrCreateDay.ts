import * as dayjs from "dayjs";
import * as admin from "firebase-admin";
import { TDay } from "../../../types/day";
import genInitialDay from "../../../src/common/appConfig/initialDay";
import { TRequestBody, TResponse, TResponseData } from "../../types";
import getDayValidationSchema from "./validation/getDayValidationSchema";

const collectionDBName: string = process.env.COLLECTION_DAYS_DB_NAME || "days";

type TDaySnapshot = TDay | null;

const getOrCreateDay = async (
  req: TRequestBody<{ date: string }>,
  res: TResponse<TResponseData<TDaySnapshot | null>>
) => {
  const date = req.params.date;
  const uid = req?.user?.uid;

  // console.log(req?.user);

  if (!uid) {
    return res.json({
      error: true,
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
      // Create day if not exists (with condition)
      const isDateValid =
        date &&
        dayjs(date, "D-MM-YY").isValid() &&
        !dayjs(date, "D-MM-YY").isAfter(dayjs()) &&
        !dayjs(date, "D-MM-YY").isBefore(dayjs().subtract(14, "days"));

      if (isDateValid) {
        const id = `${date}-${uid}`;
        await admin
          .firestore()
          .collection(collectionDBName)
          .doc(id)
          .set(genInitialDay({ date, id, uid }));

        const createdDaySnapshot = await admin
          .firestore()
          .collection(collectionDBName)
          .doc(id)
          .get();

        return res.send({
          error: false,
          data: createdDaySnapshot.data(),
          message: "Day created",
        });
      } else {
        return res.send({
          error: true,
          message:
            // eslint-disable-next-line max-len
            "You cannot change the future, nor can change days that are older than 2 weeks from the present.",
        });
      }
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

export default getOrCreateDay;
