import axios from "axios";
import Cookies from "js-cookie";
import refineData from "./refineData";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SIGN_TEST}`,
});

const checkAccess = async (token) => {
  let status = "";
  await axios
    .get(`${process.env.REACT_APP_SIGN_TEST}/chat/rooms`, {
      headers: { Authorization: token },
    })
    .catch((respon) => {
      status = respon.message;
    });
  if (status === "Network Error") {
    const REFRESH = Cookies.get("Refresh");
    const token = await axios.get(
      `${process.env.REACT_APP_SIGN_TEST}/api/reissue`,
      { headers: { Refresh: REFRESH } }
    );
    Cookies.set("Token", token.headers.authorization);
    return token.headers.authorization;
  } else {
    return token;
  }
};

instance.interceptors.request.use(
  async (config) => {
    const headers = config.headers;
    const TOKEN = Cookies.get("Token");
    if (TOKEN) {
      const token = await checkAccess(TOKEN);
      headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  console.log(response);
  if (response.config.url === "/api/member/login") {
    const TOKEN = response.headers.authorization;
    const REFRESH = response.headers.refresh;
    Cookies.set("Token", TOKEN);
    Cookies.set("Refresh", REFRESH);
    localStorage.setItem("userInfo", JSON.stringify(response.data.data));
    return response;
  } else if (response.config.url.split("?")[0] === "/member/kakao/callback/") {
    console.log("kakapsignin");
    const TOKEN = response.headers.authorization;
    const REFRESH = response.headers.refresh;
    Cookies.set("Token", TOKEN);
    Cookies.set("Refresh", REFRESH);
    localStorage.setItem("userInfo", JSON.stringify(response.data.data));
    return response;
  }
  return response;
});

const home = axios.create({
  baseURL: `${process.env.REACT_APP_HOME_URL}`,
});

home.interceptors.request.use(
  async (config) => {
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
    return response;
  } else if (response.config.url.split("?")[0] === "/api/pets/info-list") {
    let newArray = [...response.data.publicPetResponsDto];
    newArray.map((item) => {
      const refinedata = refineData(item);
      const newData = { ...item.data, refinedata };
      item.data = newData;
      return newData;
    });
    response.data.publicPetResponsDto = [...newArray];
    return response;
  }
  return response;
});

export { instance, home };
