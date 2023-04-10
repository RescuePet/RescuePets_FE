import React from "react";
import styled, { css } from "styled-components";
import { FlexAttribute } from "../../style/Mixin";
import { CategoryBoxStyle } from "./SearchMixin";
import Searchbar from "./Searchbar";
import { useSelector } from "react-redux";

import { toDown } from "../../style/Animation";
import SearchKind from "./SearchKind";

const SearchSetting = ({
  searchHandler,
  searchKindHandler,
  petwork,
  searchDistanceHandler,
}) => {
  const { descriptionCategory, inputState, distanceState } = useSelector(
    (state) => state.search
  );

  return (
    <SearchSetContainer petwork={petwork}>
      <DescriptionContainer>
        <span>거리</span>
        <DescriptionWrapper>
          <DescreptionRow>
            <CategoryBox
              active={descriptionCategory === ""}
              onClick={() => searchDistanceHandler("")}
            >
              <span>선택안함</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "1000"}
              onClick={() => searchDistanceHandler("1000")}
            >
              <span>1km</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "10000"}
              onClick={() => searchDistanceHandler("10000")}
            >
              <span>10km</span>
            </CategoryBox>
          </DescreptionRow>
          <DescreptionRow>
            <CategoryBox
              active={descriptionCategory === "50000"}
              onClick={() => searchDistanceHandler("50000")}
            >
              <span>50km</span>
            </CategoryBox>
            <CategoryBox
              active={descriptionCategory === "100000"}
              onClick={() => searchDistanceHandler("100000")}
            >
              <span>100km</span>
            </CategoryBox>
          </DescreptionRow>
        </DescriptionWrapper>
        {distanceState ? null : inputState ? (
          <Searchbar searchHandler={searchHandler} />
        ) : (
          <SearchKind searchKindHandler={searchKindHandler} />
        )}
      </DescriptionContainer>
    </SearchSetContainer>
  );
};

const SearchSetContainer = styled.div`
  width: 100%;
  height: 160px;
  padding-top: 8px;
  ${(props) =>
    !props.petwork &&
    css`
      border-top: 2px solid ${(props) => props.theme.color.input_border};
    `}
`;

const DescriptionContainer = styled.div`
  width: 335px;
  margin: 0 auto;
  span {
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

export default SearchSetting;
