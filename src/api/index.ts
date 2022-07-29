import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "https://us-central1-reflexio-2.cloudfunctions.net/api/v1";
      break;
    case "development":
    default:
      url = "http://localhost:5001/reflexio-2/us-central1/api/v1";
  }

  return url;
};

export const getDaysAPICall = async () => {
  return await axios.get(`${getBaseUrl()}/days`).then((res) => res.data);
};

export const getDayAPICall = async (date: string) => {
  return await axios
    .get(`${getBaseUrl()}/days/${date}`)
    .then((res) => res.data);
};

export const setDayAPICall = async (data: any): Promise<Response> => {
  return await axios
    .post(`${getBaseUrl()}/days/`, { data })
    .then((res) => res.data);
};
