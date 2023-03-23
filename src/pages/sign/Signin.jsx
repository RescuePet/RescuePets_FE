import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cancel from "../../asset/cancel.svg";
import check from "../../asset/check.svg";

import Layout from "../../layouts/Layout";
import { __signinUser } from "../../redux/modules/signSlice";
import { FlexAttribute, HeaderStyle, SignSvgStyle } from "../../style/Mixin";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(__signinUser({ email: value.email, password: value.password }));
  };

  const cancelInput = (e) => {
    setValue({ [e.target.name]: "" });
  };

  const URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_SIGN_ID}&redirect_uri=http://localhost:3000/kakaologin`;

  const kakaoSignUp = () => {
    window.location.href = URL;
  };

  return (
    <Layout>
      <SignContainer>
        <SignHeader>
          <span>로그인</span>
        </SignHeader>
        <SignForm id="signin" action="" onSubmit={handleSubmit}>
          <SignText>아이디</SignText>
          <InputWrapper>
            <SignInput
              name="email"
              value={value.email || ""}
              onChange={handleInput}
              placeholder="이메일 주소"
            />
            <img onClick={cancelInput} src={cancel} alt="cancel" name="email" />
          </InputWrapper>
          <SignText>비밀번호</SignText>
          <InputWrapper>
            <SignInput
              name="password"
              value={value.password || ""}
              onChange={handleInput}
              type="password"
              placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
            />
            <img
              onClick={cancelInput}
              src={cancel}
              alt="cancel"
              name="password"
            />
          </InputWrapper>
        </SignForm>
        <AutoSignInWrapper>
          <img src={check} alt="check" />
          <span>자동로그인</span>
        </AutoSignInWrapper>
        <ButtonWrapper>
          <Button TabBtn2 type="submit" form="signin">
            로그인
          </Button>
          <Button TabBtn onClick={() => kakaoSignUp()}>
            카카오톡으로 로그인
          </Button>
        </ButtonWrapper>
        <SignUpWrapper>
          <SignUpSpan onClick={() => navigate("/signup")}>회원가입</SignUpSpan>
          <BrSpan>|</BrSpan>
          <Forgot>아이디/비밀번호찾기</Forgot>
        </SignUpWrapper>
      </SignContainer>
    </Layout>
  );
};

const SignContainer = styled.div`
  ${FlexAttribute("column")}
  width: 100%;
`;

const SignHeader = styled.div`
  ${FlexAttribute("row", "center")}
  ${HeaderStyle}
`;

const SignForm = styled.form`
  ${FlexAttribute("column", "center")}
  margin: 0px 20px 0px 20px;
  img {
    ${SignSvgStyle}
  }
`;

const SignText = styled.span`
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  ${FlexAttribute("row", "", "center")}
  border-bottom: .125rem solid #eeeeee;
`;

const SignInput = styled.input`
  width: 100%;
  height: 2.875rem;
  font-size: 0.75rem;
  ::placeholder {
    color: #cccccc;
  }
`;

const ButtonWrapper = styled.div`
  ${FlexAttribute("column", "center", "center")}
  margin-top: 3.25rem;
  button:first-child {
    margin-bottom: 1.125rem;
  }
`;

const AutoSignInWrapper = styled.div`
  ${FlexAttribute("row", "flex-end", "center")}
  margin: 1.125rem 1.9375rem 0 0;
  cursor: pointer;
  img {
    ${SignSvgStyle}
  }
  span {
    margin-left: 0.5rem;
    font-size: 0.8125rem;
    color: #666666;
  }
`;

const SignUpWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 1.5rem;
`;

const SignUpSpan = styled.span`
  font-size: 0.875rem;
  cursor: pointer;
`;

const Forgot = styled.span`
  font-size: 0.75rem;
  color: #999999;
  cursor: pointer;
`;

const BrSpan = styled.span`
  margin: 0 1rem;
  font-size: 0.75rem;
  color: #999999;
`;

export default Signin;
