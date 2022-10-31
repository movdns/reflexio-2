import { Request } from "express";
import * as admin from "firebase-admin";
import { TDay } from "../../../types/day";
import { TResponse, TResponseData } from "../../types";

const collectionDBName: string = process.env.COLLECTION_DAYS_DB_NAME || "days";
const collectionLimit: number = parseInt(process.env.COLLECTION_LIMIT || "14");

type TDaySnapshot = TDay | null;

const getAllDays = async (
  req: Request,
  res: TResponse<TResponseData<TDaySnapshot | TDaySnapshot[] | null>>
) => {
  const uid = req?.user?.uid;

  if (!uid) {
    return res.json({
      error: true,
      message: "Insufficient permissions",
    });
  }

  try {
    const dayQuerySnapshot = await admin
      .firestore()
      .collection(collectionDBName)
      .limit(collectionLimit)
      .where("uid", "==", uid)
      .orderBy("date", "desc")
      .get();

    if (dayQuerySnapshot.size) {
      const dayArr: TDaySnapshot[] = [];
      dayQuerySnapshot.forEach((doc) => {
        const data: TDaySnapshot = { id: doc.id, ...doc.data() };
        dayArr.push(data);
      });
      return res.json({
        error: false,
        data: dayArr,
      });
    } else {
      return res.json({
        error: true,
        data: null,
        message: "No days found",
      });
    }
  } catch (e) {
    console.log("Day list error: ", e);
    return res.json({
      error: true,
      message: "Something went wrong!",
    });
  }
};

export default getAllDays;
