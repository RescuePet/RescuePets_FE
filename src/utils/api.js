import axios from "axios";
import Cookies from "js-cookie";
import refineData from "./refineData";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_HOME_URL}`,
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

const home = axios.create({
  baseURL: `${process.env.REACT_APP_HOME_URL}`,
});

home.interceptors.request.use(
  (config) => {
    const headers = config.headers;
    const TOKEN = Cookies.get("Token");
    if (TOKEN) {
      headers.Authorization = TOKEN;
    }
    console.log("request -> ", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

home.interceptors.response.use((response) => {
  if (response.config.url.replace(/[0-9]/g, "") === "/api/pets/details/") {
    const refinedata = refineData(response.data);
    const newData = { ...response.data, refinedata };
    response.data = newData;
    console.log("response1 -> ", response);
    return response;
  } else if (response.config.url.split("?")[0] === "/api/pets/info-list") {
    let newArray = [...response.data.publicPetResponsDto];
    newArray.map((item) => {
      const refinedata = refineData(item);
      const newData = { ...item.data, refinedata };
      item.data = newData;
      console.log("response2 -> ", response);
      return newData;
    });
    response.data.publicPetResponsDto = [...newArray];
    return response;
  }
  console.log("response5 -> ", response.data.data);
  return response;
});

export { instance, home };
