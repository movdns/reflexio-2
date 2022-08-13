import * as admin from "firebase-admin";
import { Request } from "express";
import { TResponse, TResponseData } from "../../types";
import { TIconGroupSnapshot } from "./types";

const collectionDBName: string =
  process.env.COLLECTION_ICONS_DB_NAME || "icons";

/**
 * Get single icons group
 * @param {TRequestBody<{ id: string }>} req
 * @param {TResponse<TResponseData<TIconGroupSnapshot | null>>} res
 */
async function getIconsGroup(
  req: Request,
  res: TResponse<TResponseData<TIconGroupSnapshot | null>>
) {
  const id = req.params.id;

  try {
    const iconsGroupQuerySnapshot = await admin
      .firestore()
      .collection(collectionDBName)
      .doc(id)
      .get();

    const iconsGroup =
      { id: iconsGroupQuerySnapshot.id, ...iconsGroupQuerySnapshot.data() } ||
      null;

    if (iconsGroup) {
      return res.send({
        error: false,
        data: iconsGroup,
        message: "Icon group retrieved",
      });
    } else {
      return res.send({
        error: true,
        message: "Icon group not exists",
      });
    }
  } catch (e) {
    console.log("Retrieving icons error: ", e);
    return res.send({
      error: true,
      message: "Something went wrong!",
    });
  }
}

export default getIconsGroup;
