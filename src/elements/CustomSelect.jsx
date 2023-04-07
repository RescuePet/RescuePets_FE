import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Border_1_color } from "../style/Mixin";

export const CustomSelect = ({
  data,
  onChangeData,
  onChangeID,
  selectedValue,
}) => {
  console.log(selectedValue);
  const [currentValue, setCurrentValue] = useState(data[0].name);

  useEffect(() => {
    if (selectedValue == "DOG") {
      setCurrentValue(data[0].name);
    } else if (selectedValue == "CAT") {
      setCurrentValue(data[1].name);
    } else if (selectedValue == "ETC") {
      setCurrentValue(data[2].name);
    }
    if (selectedValue === "12:00") {
      setCurrentValue(data[0].name);
    } else if (selectedValue === "13:00") {
      setCurrentValue(data[1].name);
    } else if (selectedValue === "14:00") {
      setCurrentValue(data[2].name);
    } else if (selectedValue === "15:00") {
      setCurrentValue(data[3].name);
    } else if (selectedValue === "16:00") {
      setCurrentValue(data[4].name);
    } else if (selectedValue === "17:00") {
      setCurrentValue(data[5].name);
    } else if (selectedValue === "18:00") {
      setCurrentValue(data[6].name);
    } else if (selectedValue === "19:00") {
      setCurrentValue(data[7].name);
    } else if (selectedValue === "20:00") {
      setCurrentValue(data[8].name);
    } else if (selectedValue === "21:00") {
      setCurrentValue(data[9].name);
    } else if (selectedValue === "22:00") {
      setCurrentValue(data[10].name);
    } else if (selectedValue === "23:00") {
      setCurrentValue(data[11].name);
    } else if (selectedValue === "24:00") {
      setCurrentValue(data[12].name);
    } else if (selectedValue === "01:00") {
      setCurrentValue(data[13].name);
    } else if (selectedValue === "02:00") {
      setCurrentValue(data[14].name);
    } else if (selectedValue === "03:00") {
      setCurrentValue(data[15].name);
    } else if (selectedValue === "04:00") {
      setCurrentValue(data[16].name);
    } else if (selectedValue === "05:00") {
      setCurrentValue(data[17].name);
    } else if (selectedValue === "06:00") {
      setCurrentValue(data[18].name);
    } else if (selectedValue === "07:00") {
      setCurrentValue(data[19].name);
    } else if (selectedValue === "08:00") {
      setCurrentValue(data[20].name);
    } else if (selectedValue === "09:00") {
      setCurrentValue(data[21].name);
    } else if (selectedValue === "10:00") {
      setCurrentValue(data[22].name);
    } else if (selectedValue === "11:00") {
      setCurrentValue(data[23].name);
    }

    // for(let i=0; i<data.length; i++ ){

    // }
  }, []);
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
