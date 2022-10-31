import { TUserSettings } from "root/types/userSettings";
import { TResponseData } from "root/types";
import { TDay } from "root/types/day";
import axios from "axios";

const getBaseUrl = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.REACT_APP_BACKEND_API_PRODUCTION_URL;
    case "development":
    default:
      return process.env.REACT_APP_BACKEND_API_DEVELOPMENT_URL;
  }
};

// Days Collection
export const getDaysAPICall = async (): Promise<TResponseData<any>> => {
  return await axios.get(`${getBaseUrl()}/days`).then((res) => res.data);
};

// Day Resource
export const getDayAPICall = async (
  date: string
): Promise<TResponseData<any>> => {
  return await axios
    .get(`${getBaseUrl()}/days/${date}`)
    .then((res) => res.data);
};

// Day Resource Mutation
export const setDayAPICall = async (
  data: any
): Promise<TResponseData<TDay>> => {
  return await axios
    .post(`${getBaseUrl()}/days/`, { data })
    .then((res) => res.data);
};

// User Settings (palette, glyphs, tags, etc.)
export const getUserSettingsAPICall = async (): Promise<TResponseData<any>> => {
  return await axios.get(`${getBaseUrl()}/settings`).then((res) => res.data);
};

// User Settings Mutation
export const setUserSettingsAPICall = async (
  data: Partial<TUserSettings>
): Promise<TResponseData<any>> => {
  return await axios
    .post(`${getBaseUrl()}/settings/`, { data })
    .then((res) => res.data);
};
