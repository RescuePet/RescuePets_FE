import React from "react";
import styled from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import { CategoryBoxStyle } from "./SearchMixin";
import Searchbar from "./Searchbar";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDescriptionCategory,
  toggleKindCategory,
} from "../../redux/modules/searchSlice";
import { toDown } from "../../style/Animation";

const SearchSetting = () => {
  const dispatch = useDispatch();
  const { descriptionCategory, kindCategory, inputState } = useSelector(
    (state) => state.search
  );
  return (
    <SearchSetContainer>
      <DescriptionContainer>
        <span>거리</span>
        <DescriptionWrapper>
          <DescreptionRow>
            <CategoryBox
              active={descriptionCategory === ""}
              onClick={() => dispatch(toggleDescriptionCategory(""))}
            >
              <span>선택안함</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "1km"}
              onClick={() => dispatch(toggleDescriptionCategory("1km"))}
            >
              <span>1km</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "10km"}
              onClick={() => dispatch(toggleDescriptionCategory("10km"))}
            >
              <span>10km</span>
            </CategoryBox>
          </DescreptionRow>
          <DescreptionRow>
            <CategoryBox
              active={descriptionCategory === "50km"}
              onClick={() => dispatch(toggleDescriptionCategory("50km"))}
            >
              <span>50km</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "100km"}
              onClick={() => dispatch(toggleDescriptionCategory("100km"))}
            >
              <span>100km</span>
            </CategoryBox>
          </DescreptionRow>
        </DescriptionWrapper>
        {inputState ? (
          <Searchbar />
        ) : (
          <>
            <span>종류</span>
            <KindRow>
              <CategoryBox
                active={kindCategory === "DOG"}
                onClick={() => dispatch(toggleKindCategory("DOG"))}
              >
                <span>강아지</span>
              </CategoryBox>
              <CategoryBox
                active={kindCategory === "CAT"}
                onClick={() => dispatch(toggleKindCategory("CAT"))}
              >
                <span>고양이</span>
              </CategoryBox>
              <CategoryBox
                active={kindCategory === "ETC"}
                onClick={() => dispatch(toggleKindCategory("ETC"))}
              >
                <span>기타</span>
              </CategoryBox>
            </KindRow>
          </>
        )}
      </DescriptionContainer>
    </SearchSetContainer>
  );
};

const SearchSetContainer = styled.div`
  width: 100%;
  height: 160px;
  padding-top: 8px;
  border-top: 2px solid ${(props) => props.theme.color.input_border};
`;

const DescriptionContainer = styled.div`
  width: 335px;
  margin: 0 auto;
  > span {
    ${(props) => props.theme.Body_400_12}
  }
`;

const CategoryBox = styled.div`
  ${CategoryBoxStyle}
`;

const DescriptionWrapper = styled.div``;

const DescreptionRow = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 8px;
  :first-child {
    animation: ${toDown} 0.25s ease-in-out;
  }
  :last-child {
    animation: ${toDown} 0.5s ease-in-out;
  }
`;

const KindRow = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 8px;
  animation: ${toDown} 0.75s ease-in-out;
`;

export default SearchSetting;
