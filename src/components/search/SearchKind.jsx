import React from "react";
import styled from "styled-components";
import { CategoryBoxStyle } from "./SearchMixin";
import { toDown } from "../../style/Animation";
import { FlexAttribute } from "../../style/Mixin";
import { useSelector } from "react-redux";

import { logEvent } from "../../utils/amplitude";

const SearchKind = ({ searchKindHandler }) => {
  const { kindCategory } = useSelector((state) => state.search);

  return (
    <SearchKindContainer>
      <span>종류</span>
      <KindRow>
        <CategoryBox
          active={kindCategory === "DOG"}
          onClick={() => {
            searchKindHandler("DOG");
            logEvent("search_type_DOG");
          }}
        >
          <span>강아지</span>
        </CategoryBox>
        <CategoryBox
          active={kindCategory === "CAT"}
          onClick={() => {
            searchKindHandler("CAT");
            logEvent("search_type_CAT");
          }}
        >
          <span>고양이</span>
        </CategoryBox>
        <CategoryBox
          active={kindCategory === "ETC"}
          onClick={() => {
            searchKindHandler("ETC");
            logEvent("search_type_ETC");
          }}
        >
          <span>기타</span>
        </CategoryBox>
      </KindRow>
    </SearchKindContainer>
  );
};

const SearchKindContainer = styled.div``;

const CategoryBox = styled.div`
  ${CategoryBoxStyle}
`;

const KindRow = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin-top: 8px;
  animation: ${toDown} 0.75s ease-in-out;
`;

export default SearchKind;
