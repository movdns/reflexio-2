import * as admin from "firebase-admin";
import { Request } from "express";
import { TResponseData, TResponse } from "../../types";
import { TIconGroupSnapshot } from "./types";

const collectionIconsDBName: string =
  process.env.COLLECTION_ICONS_DB_NAME || "icons";

/**
 * Get single icons group
 * @param {Request} req
 * @param {TResponse<TResponseData<TIconGroupSnapshot[] | null>>} res
 */
async function getIconsGroups(
  req: Request,
  res: TResponse<TResponseData<TIconGroupSnapshot[] | null>>
) {
  try {
    const iconQuerySnapshot = await admin
      .firestore()
      .collection(collectionIconsDBName)
      .limit(6)
      .orderBy("order", "desc")
      .get();

    if (iconQuerySnapshot.size) {
      const iconArr: TIconGroupSnapshot[] = [];
      iconQuerySnapshot.forEach((doc) => {
        const data: TIconGroupSnapshot = { id: doc.id, ...doc.data() };
        iconArr.push(data);
      });
      return res.json({
        error: false,
        data: iconArr,
      });
    } else {
      return res.json({
        error: true,
        data: null,
        message: "No icons found",
      });
    }
  } catch (e) {
    console.log("Icons list error: ", e);
    return res.json({
      error: true,
      message: "Something went wrong!",
    });
  }
}

export default getIconsGroups;
