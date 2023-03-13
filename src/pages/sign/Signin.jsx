import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import cancel from "../../asset/cancel.svg";
import check from "../../asset/check.svg";

import Layout from "../../layouts/Layout";
import { __signinUser } from "../../redux/modules/signSlice";
import { FlexAttribute, SignSvgStyle } from "../../style/Mixin";

const Signin = () => {
  const [value, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

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
          <button type="submit" form="signin">
            로그인
          </button>
          <button>카카오톡으로 로그인</button>
        </ButtonWrapper>
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
  width: 100%;
  height: 5rem;
  padding-top: 2.5rem;
  border-bottom: 0.25rem solid #eeeeee;
  font-size: 1.125rem;
  font-weight: 700;
`;

const SignForm = styled.form`
  ${FlexAttribute("column", "center")}
  margin: 0rem 1.25rem 0rem 1.25rem;
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
  border-bottom: 0.125rem solid #eeeeee;
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
  ${FlexAttribute("column", "center")}
`;

const AutoSignInWrapper = styled.div`
  ${FlexAttribute("row", "flex-end", "center")}
  margin: 18px 31px 0 0;
  cursor: pointer;
  img {
    ${SignSvgStyle}
  }
  span {
    margin-left: 8px;
    font-size: 13px;
    color: #666666;
  }
`;

export default Signin;
