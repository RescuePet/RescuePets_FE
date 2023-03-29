import Cookies from 'js-cookie';
const isLogin = () => !!Cookies.get('Token');
export default isLogin;