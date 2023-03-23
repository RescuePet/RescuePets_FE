import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import back from "../../asset/Back.svg";
import eye from "../../asset/eye.svg";
import Layout from "../../layouts/Layout";
import { __signupUser } from "../../redux/modules/signSlice";
import {
  FlexAttribute,
  SignSvgStyle,
  Border_2_color,
  Border_1_color,
} from "../../style/Mixin";
import Button from "../../elements/Button";
import { CustomSelect } from "../../elements/CustomSelect";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const data = [
    { id: 0, name: "naver.com" },
    { id: 1, name: "gmail.com" },
    { id: 2, name: "nate.com" },
  ];
  // 종류데이터
  const [email, setEmail] = useState(data[0].name);
  const onChangeData = (newData) => {
    setEmail(newData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  // 비밀번호 체크 로직
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //비밀번호 이모티콘
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onSubmitSignupHandler = (data) => {
    if (data.password === data.checkpassword) {
      // console.log(data)
      const id = data.id + "@" + email;
      console.log(id);
      console.log(data.password);
      console.log(data.nickname);
      const userInfo = {
        email: id,
        password: data.password,
        nickname: data.nickname,
      };
      dispatch(__signupUser(userInfo));
      reset();
      navigate("/signin");
    } else {
      alert("비밀번호 오류");
    }
  };

  return (
    <Layout>
      <SignContainer onSubmit={handleSubmit(onSubmitSignupHandler)}>
        <SignHeader>
          <div onClick={() => navigate("/signin")}>
            <img src={back} alt="back" />
          </div>
          <div>회원가입</div>
          <div></div>
        </SignHeader>

        <SignIdNincknameBox>
          <p>아이디</p>
          <div>
            <div>
              <SignsmInput
                name="email"
                type="text"
                placeholder="입력하기"
                required
                {...register("id", {
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "영문 숫자 2 ~ 8글자 사이로 입력",
                  },
                  maxLength: { value: 12, message: "12글자이내 작성" },
                })}
              />
              <span>{errors?.id?.message}</span>
            </div>
            <p>@</p>
            <div>
              <CustomSelect data={data} onChangeData={onChangeData} />
            </div>
          </div>
        </SignIdNincknameBox>

        <SignPwBox>
          <p>비밀번호</p>
          <div>
            <div>
              <SignLgInput
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message:
                      "비밀번호 (최소 8자리 숫자, 문자, 특수문자 최소 1개",
                  },
                  maxLength: {
                    value: 12,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                })}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
              />
              <img onClick={toggleShowPassword} src={eye} alt="showPassword" />
              <span>{errors?.password?.message}</span>
            </div>
            <div>
              <SignLgInput
                name="checkpassword"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호 재입력"
                {...register("checkpassword", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                  maxLength: {
                    value: 12,
                    message: "8~12 자리 숫자, 문자, 특수문자 최소 1개",
                  },
                })}
              />

              <img onClick={toggleShowPassword} src={eye} alt="showPassword" />
              <span>{errors?.checkpassword?.message}</span>
            </div>
          </div>
        </SignPwBox>

        <SignIdNincknameBox>
          <p>닉네임</p>
          <div>
            <SignLgInput
              {...register("nickname", {
                required: true,
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣]+$/,
                  message: "8자이내 한글 또는 영문",
                },
                maxLength: { value: 8, message: "8자이내 한글 또는 영문" },
              })}
              name="nickname"
              type="text"
              placeholder="8자이내 한글 또는 영문"
            />
            <span>{errors?.nickname?.message}</span>
          </div>
        </SignIdNincknameBox>
        <SignBtnBox>
          <Button assistiveFillButton type="submit" TabBtn2>
            가입완료
          </Button>
        </SignBtnBox>
      </SignContainer>
    </Layout>
  );
};
const SignContainer = styled.form`
  ${FlexAttribute("column", "", "center")}
  width: 100%;
  height: 50.75rem;
  gap: 2rem 0;
`;

const SignHeader = styled.div`
  width: 100%;
  height: 80px;
  padding-top: 20px;
  ${Border_2_color}
  font-size: 1.125rem;
  font-weight: 700;
  ${FlexAttribute("row", "", "center")};
  color: ${(props) => props.theme.color.text_nomal};
  div {
    height: 100%;
    width: 33.3%;
    ${(props) => props.theme.FlexCenter}
    ${(props) => props.theme.Title_700_18}
  }
  img {
    width: 24px;
    height: 24px;
    margin-right: 50px;
  }
`;

const SignIdNincknameBox = styled.div`
  width: 20.9375rem;
  height: 4rem;
  margin-top: 2rem;
  > p {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14}
  }
  > div {
    position: relative;
    width: 100%;
    height: 80%;
    ${(props) => props.theme.FlexRow}
    > div {
      width: 50%;
      height: 90%;
      > span {
        ${(props) => props.theme.Span_alert}
      }
    }
    > span {
      position: absolute;
      top: 40px;
      ${(props) => props.theme.Span_alert}
    }
  }
`;
const SignPwBox = styled.div`
  width: 20.9375rem;
  height: 7.5rem;
  > p {
    width: 100%;
    height: 20%;
    ${(props) => props.theme.Body_400_14}
  }
  > div {
    width: 100%;
    height: 80%;
    ${(props) => props.theme.FlexColumn}
    > div {
      position: relative;
      width: 100%;
      height: 50%;

      > img {
        position: absolute;
        ${SignSvgStyle}
        top: 10px;
        right: 0px;
      }
      > span {
        position: absolute;
        display: flex;
        ${(props) => props.theme.Span_alert}
      }
    }
  }
`;

const SignBtnBox = styled.div`
  width: 20.9375rem;
  height: 5rem;
  margin-top: 5rem;
  ${(props) => props.theme.FlexCenter}
`;
const SignsmInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  ${Border_1_color}
  background: transparent;
  ${(props) => props.theme.Body_400_12}
  cursor: pointer;
  ::placeholder {
    color: ${(props) => props.theme.color.text_assistive};
  }
`;
const SignLgInput = styled.input`
  width: 20.9375rem;
  height: 1.5625rem;
  margin-top: 5px;
  ${Border_1_color}
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  ::placeholder {
    color: ${(props) => props.theme.color.text_assistive};
  }
`;

export default Signup;
