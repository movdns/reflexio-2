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

axios.defaults.baseURL = getBaseUrl();
//axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;
