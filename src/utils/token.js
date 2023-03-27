import Cookies from "js-cookie";

const isSignin = () => !!Cookies.get("Refresh");

export default isSignin;