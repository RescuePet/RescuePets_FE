import { init, track, setUserId, reset } from "@amplitude/analytics-browser";
import Cookies from "js-cookie";

export const initAmplitude = () => {
  init(`${process.env.REACT_APP_AMPLITUDE}`);
};

export const logEvent = (eventName, eventProperties) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = () => {
  const userId = JSON.parse(Cookies.get("UserInfo")).email;
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};
