import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SIGN_TEST}`,
});

export { instance };
