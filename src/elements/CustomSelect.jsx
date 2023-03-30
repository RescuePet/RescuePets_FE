import React, { useState } from "react";
import styled from "styled-components";
import { Border_1_color } from "../style/Mixin";

export const CustomSelect = ({ data, onChangeData, onChangeID }) => {
  const [currentValue, setCurrentValue] = useState(data[0].name);
  // console.log(currentValue) //이 값을 상위컴포넌트로 보내야 한다
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    // 하위컴포넌트에서 보여줄값
    setCurrentValue(e.target.getAttribute("value"));
    // 이코드로 상위컴포넌트로 가장최신값을 보낸다
    onChangeData(e.target.getAttribute("value"));
    if (onChangeID !== null) {
      onChangeID(e.target.id);
    } else {
      onChangeID(e.target.id);
    }
  };

  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Label>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        {data.map((data) => (
          <Option
            key={data.id}
            // 옵션들 값
            id={data.value}
            value={data.name}
            onClick={handleOnChangeSelectValue}
          >
            {/* 선택된 값*/}
            {data.name}
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};

const SelectBox = styled.div`
  position: relative;
  width: 9.75rem;
  height: 1.5625rem;
  ${Border_1_color}
  padding: .5rem 0 1.25rem 0;
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 0.0625rem;
    right: 0.5rem;
    color: #999999;
    font-size: 1.25rem;
  }
`;
const Label = styled.label`
  margin-left: 0.25rem;
  text-align: center;
  ${(props) => props.theme.Body_400_12}
  color: ${(props) => props.theme.color.text_normal};
`;

const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 2.1875rem;
  left: 0;
  width: 100%;
  overflow: scroll;
  height: 6.25rem;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.color.line_alternative};
  z-index: 10;
`;

const Option = styled.li`
  padding: 0.375rem 0.5rem;
  transition: background-color 0.2s ease-in;
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
  &:hover {
    background-color: #595959;
  }
`;
