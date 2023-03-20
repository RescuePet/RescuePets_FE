import React from "react";
import styled from "styled-components";
import { Border_2_color, FlexAttribute } from "../../../style/Mixin";
import { Button_700_16 } from "../../../style/theme";

const Category = () => {
  return (
    <CategoryWrapper>
      <SightingButton>실종</SightingButton>
      <MissingButton>목격</MissingButton>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  ${Border_2_color}
  position: relative;
  height: 48px;
`;

const SightingButton = styled.button`
  position: absolute;
  right: 60%;
  width: 120px;
  height: 48px;
  ${Button_700_16}
  border-bottom: 2px solid #999999;
  bottom: -2px;
`;

const MissingButton = styled.button`
  position: absolute;
  left: 60%;
  width: 120px;
  ${Button_700_16}
  color: #999999;
`;

export default Category;
