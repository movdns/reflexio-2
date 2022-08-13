import axios from "axios";
// import firebase from "firebase/app";

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

// const axiosWithToken = axios.create({
//   baseURL: getBaseUrl(),
//   timeout: 1000,
//   headers: { Authorization: "Bearer " + token },
// });

export const getDaysAPICall = async () => {
  return await axios.get(`${getBaseUrl()}/days`).then((res) => res.data);
};

export const getDayAPICall = async (date: string) => {
  return await axios
    .get(`${getBaseUrl()}/days/${date}`)
    .then((res) => res.data);
};

export const setDayAPICall = async (data: any): Promise<Response> => {
  // console.log("data", data);
  return await axios
    .post(`${getBaseUrl()}/days/`, { data })
    .then((res) => res.data);
};

export const getIconsAPICall = async () => {
  return await axios.get(`${getBaseUrl()}/icons`).then((res) => res.data);
};
