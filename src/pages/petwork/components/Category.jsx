import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { toggleCategory } from "../../../redux/modules/petworkSlice";
import { Border_2_color, FlexAttribute } from "../../../style/Mixin";
import { Button_700_16 } from "../../../style/theme";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.petwork.category);

  useEffect(() => {
    toggleCategoryHandler(category);
  }, [category]);

  const toggleCategoryHandler = (category) => {
    dispatch(toggleCategory(category));
  };
  return (
    <CategoryWrapper>
      <ActiveButton
        active={category === "우리집 반려동물을 찾아주세요"}
        onClick={() => toggleCategoryHandler("우리집 반려동물을 찾아주세요")}
      >
        실종
      </ActiveButton>
      <ActiveButton
        active={category === "길 잃은 동물을 발견했어요"}
        onClick={() => toggleCategoryHandler("길 잃은 동물을 발견했어요")}
      >
        목격
      </ActiveButton>
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
  background-color: ${(props) => props.theme.color.white}; ;
`;

const ActiveButton = styled.button`
  right: 60%;
  width: 120px;
  height: 49px;
  ${Button_700_16}
  background-color: transparent;
  color: ${(props) => props.theme.color.black};
  ${(props) =>
    props.active
      ? css`
          border-bottom: 2px solid
            ${(props) => props.theme.color.primary_normal}; ;
        `
      : css`
          border-bottom: 2px solid transparent;
        `}
`;

export default Category;
