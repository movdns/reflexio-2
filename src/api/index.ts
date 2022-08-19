import axios from "axios";
import { TResponseData } from "../types";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "https://us-central1-reflexio-2.cloudfunctions.net/api/v2";
      break;
    case "development":
    default:
      url = "http://localhost:5001/reflexio-2/us-central1/api/v2";
  }
  return url;
};

/**
 * Days
 */

// Collection
export const getDaysAPICall = async (): Promise<TResponseData<any>> => {
  return await axios.get(`${getBaseUrl()}/days`).then((res) => res.data);
};

// Resource
export const getDayAPICall = async (
  date: string
): Promise<TResponseData<any>> => {
  return await axios
    .get(`${getBaseUrl()}/days/${date}`)
    .then((res) => res.data);
};

// Mutation
export const setDayAPICall = async (data: any): Promise<TResponseData<any>> => {
  return await axios
    .post(`${getBaseUrl()}/days/`, { data })
    .then((res) => res.data);
};

/**
 * Glyphs
 */

// Collection
// @todo TResponseData<TGlyphGroup[]>
export const getGlyphsGroupsAPICall = async (): Promise<TResponseData<any>> => {
  return await axios.get(`${getBaseUrl()}/icons`).then((res) => res.data);
};
