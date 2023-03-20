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
  height: 48px;
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
`;

const SightingButton = styled.button`
  right: 60%;
  width: 120px;
  height: 49px;
  ${Button_700_16}
  border-bottom: 2px solid #999999;
  background-color: transparent;
`;

const MissingButton = styled.button`
  left: 60%;
  width: 120px;
  height: 49px;
  ${Button_700_16}
  color: #999999;
  background-color: transparent;
`;

export default Category;
