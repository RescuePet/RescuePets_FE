import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SIGN_TEST}`,
});

instance.interceptors.request.use(
  (config) => {
    const headers = config.headers;
    const TOKEN = Cookies.get("Token");
    console.log(TOKEN);
    if (TOKEN) {
      console.log("if in token");
      headers.Authorization = TOKEN;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { instance };
