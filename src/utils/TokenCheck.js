import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import isLogin from "./isLogin"

export const TokenCheck = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const getToken = Cookies.get('Token');

    const SignIN = location.pathname === "/signin";
    const SignUP = location.pathname === "/signup";
    const Onboarding = location.pathname === "/";

    useEffect(() => {
        if (!SignIN && !SignUP && !Onboarding && !getToken) {
            alert('로그인 시간이 만료되었습니다. 다시 로그인 해주세요');
            setTimeout(function () {
                navigate('/')
            }, 1000);
        }
    }, [SignIN, SignUP, getToken, navigate])

    return null
}


// export const AccessToken = () => {
//     const [modalAlert, toggleModal] = useModalState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (isLogin() === true) {
//             toggleModal(true);
//         }
//     }, [toggleModal]);

//     if (isLogin()) {
//         return navigate('/');
//     }

//     return (
//         <div>로그인필요하다</div>
//         // <CustomModal isOpen={modalAlert} toggle={toggleModal}>
//         //     로그인이 필요합니다!.
//         // </CustomModal>
//     );
// }