import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { toggleCategory } from "../../../redux/modules/petworkSlice";
import { Border_2_color, FlexAttribute } from "../../../style/Mixin";
import { Button_700_16 } from "../../../style/theme";
import { setPostType } from "../../../redux/modules/searchSlice";

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
        onClick={() => {
          dispatch(setPostType("MISSING"));
          toggleCategoryHandler("우리집 반려동물을 찾아주세요");
        }}
      >
        실종
      </ActiveButton>
      <ActiveButton
        active={category === "길 잃은 동물을 발견했어요"}
        onClick={() => {
          dispatch(setPostType("CATCH"));
          toggleCategoryHandler("길 잃은 동물을 발견했어요");
        }}
      >
        목격
      </ActiveButton>
    </CategoryWrapper>
  );
};

const CategoryWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly", "center")}
  ${Border_2_color}
  height: 3rem;
  position: sticky;
  top: 0;
  z-index: 12;
  background-color: transparent;
  backdrop-filter: blur(10px);
`;

const ActiveButton = styled.button`
  right: 60%;
  width: 7.5rem;
  height: 3.0625rem;
  ${Button_700_16}
  background-color: transparent;
  color: ${(props) => props.theme.color.black};
  border-radius: 4px 4px 0 0;
  ${(props) =>
    props.active
      ? css`
          border-bottom: 0.125rem solid
            ${(props) => props.theme.color.primary_normal};
        `
      : css`
          border-bottom: 0.125rem solid transparent;
        `}
  :hover {
    background-color: ${(props) => props.theme.color.line_alternative};
    transition: 0.3s;
    border-bottom: 0.125rem solid
      ${(props) => props.theme.color.primary_altemative};
    backdrop-filter: blur(10px);
  }
  :active {
    border-bottom: 0.125rem solid ${(props) => props.theme.color.primary_heavy};
  }
`;

export default Category;
