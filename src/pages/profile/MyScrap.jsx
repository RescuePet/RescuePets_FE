import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../layouts/Layout";
import { FlexAttribute, HeaderStyle } from "../../style/Mixin";
import { useInView } from "react-intersection-observer";
import ScrapList from "./components/ScrapList";

import close from "../../asset/Close.svg";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utils/api";
import ScrollToTop from "../../elements/ScrollToTop";
import refresh from "../../asset/refresh.svg";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/profileSlice";
import Error404 from "../../elements/Error404";
import ErrorScrap from "../../asset/error/404scrap.png";

const MyScrap = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ref, inView] = useInView();
  const [myScrapList, setMyScrapList] = useState([]);
  const [myScrapPage, setMyScrapPage] = useState(1);
  const { myData } = useSelector((state) => state.profile);

  let payload = {
    page: myScrapPage,
    size: 15,
  };

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `api/scrap/list?page=${payload.page}&size=${payload.size}`
      );
      setMyScrapList((prev) => [
        ...prev,
        ...response.data.data.scrapResponseDtoList,
      ]);
      setMyScrapPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    window.location.reload();
  };

  return (
    <Layout>
      <ScrollToTop />
      <MyPostHeader>
        <h2>스크랩 목록</h2>
        <CloseSvg src={close} onClick={() => navigate("/profile")} />
      </MyPostHeader>
      <PostInfoContainer>
        <PostInfoWrapper>
          <div>
            <EntireTitle>총 작성 글</EntireTitle>
            <EntireCount>{myData.scrapCount}</EntireCount>
          </div>
          <RefreshButton src={refresh} onClick={refreshHandler} />
        </PostInfoWrapper>
      </PostInfoContainer>
      <ListContainer>
        {myScrapList.length === 0 ? (
          <Error404 srcUrl={ErrorScrap} />
        ) : (
          myScrapList.map((item) => {
            return (
              <ScrapList
                key={`my-scrap-item-${item.scrapId}`}
                item={item}
              ></ScrapList>
            );
          })
        )}
        <div ref={ref}></div>
      </ListContainer>
    </Layout>
  );
};

const MyPostHeader = styled.div`
  position: relative;
  ${FlexAttribute("row", "center")}
  ${HeaderStyle}
  h2 {
    ${(props) => props.theme.Body_500_16};
    color: ${(props) => props.theme.color.text_normal};
    line-height: 1.5rem;
    margin-bottom: 16px;
  }
`;

const CloseSvg = styled.img`
  position: absolute;
  right: 1.25rem;
  cursor: pointer;
`;

const PostInfoContainer = styled.div`
  width: 100%;
  border-bottom: 0.0625rem solid ${(props) => props.theme.color.input_border}; ;
`;

const EntireTitle = styled.span`
  ${(props) => props.theme.Body_400_12};
`;

const EntireCount = styled.span`
  margin-left: 0.5rem;
  ${(props) => props.theme.Body_500_12};
  color: ${(props) => props.theme.color.primary_normal};
`;

const RefreshButton = styled.img`
  cursor: pointer;
  ${(props) => props.theme.Body_400_12};
  color: ${(props) => props.theme.color.text_alternative};
`;

const PostInfoWrapper = styled.div`
  ${FlexAttribute("row", "space-between", "center")}
  margin: .5rem 1.25rem;
`;

const ListContainer = styled.div`
  ${FlexAttribute("column", "", "center")}
`;

export default MyScrap;
