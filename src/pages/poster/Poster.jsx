import React from "react";
import Layout from "../../layouts/Layout";
import styled from "styled-components";
import Title from "./components/Title";
import Button from "../../elements/Button";
import { Body_400_14 } from "../../style/theme";
import { FlexAttribute } from "../../style/Mixin";
import QRCode from "qrcode.react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { __getMissingPostDetail } from "../../redux/modules/petworkSlice";
import { useEffect, useParams } from "react";

const Poster = () => {
  // 컴포넌트 다운
  const makeImageHandler = () => {
    domtoimage.toBlob(document.querySelector(".poster")).then((blob) => {
      saveAs(blob, "poster.jpg");
    });
  };

  const dispatch = useDispatch();
  // const { id } = useParams();
  const id = 5;

  const { missingPostDetail } = useSelector((state) => state?.petwork);

  useEffect(() => {
    dispatch(__getMissingPostDetail(id));
    // console.log(missingPostDetail);
  }, [id]);

  if (JSON.stringify(missingPostDetail) === "{}") {
    return <div>Loading...</div>;
  }
  console.log("missingPostDetail", missingPostDetail.postImages[0].imageURL);

  return (
    <Layout>
      <HeadSpan>실종 글 작성하기</HeadSpan>
      <PosterLayout className="poster">
        <SecondSpan>강아지를 찾습니다</SecondSpan>
        <ImageWrapper images={missingPostDetail.postImages[0].imageURL}>
          <ImageMain
            src={missingPostDetail.postImages[0].imageURL}
            crossorigin="anonymous"
          />
          <QRCodeWrapper>
            <QRCode
              id="qrcode"
              value="http://localhost:3000/missingdetail/${missingPostDetail.id}"
              fgColor="#ffffff"
              bgColor="transparent"
              size="80"
            />
          </QRCodeWrapper>
        </ImageWrapper>
        <Title></Title>
        <LocationWrapper>
          <InfoWrapper>
            <BodyTitle>
              <BodyTitleSvg>📍</BodyTitleSvg>
              <BodyTitleText>위치</BodyTitleText>
            </BodyTitle>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.happenPlace}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitle>
              <BodyTitleSvg>📍</BodyTitleSvg>
              <BodyTitleText>실종일시</BodyTitleText>
            </BodyTitle>
            <ContentTextWrapper>
              <ContentTextBox>
                <ContentOptionText>
                  {missingPostDetail.happenDt} |{" "}
                </ContentOptionText>
                &nbsp;<ContentText>{missingPostDetail.happenHour}</ContentText>
              </ContentTextBox>
            </ContentTextWrapper>
          </InfoWrapper>
          {missingPostDetail.specialMark && (
            <InfoWrapper>
              <BodyTitle>
                <BodyTitleSvg>📍</BodyTitleSvg>
                <BodyTitleText>특징</BodyTitleText>
              </BodyTitle>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.specialMark}</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}
          {missingPostDetail.content && (
            <InfoWrapper>
              <BodyTitle>
                <BodyTitleSvg>📍</BodyTitleSvg>
                <BodyTitleText>메모</BodyTitleText>
              </BodyTitle>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.content}</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}

          <InfoWrapper>
            <BodyTitle>
              <BodyTitleSvg>📍</BodyTitleSvg>
              <BodyTitleText>사례금</BodyTitleText>
            </BodyTitle>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.gratuity}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
        </LocationWrapper>
        <PhoneNumberContainer>
          <PhonNumberTitle>연락처</PhonNumberTitle>
          <PhoneNumberWrapper>
            <PhoneNumber>{missingPostDetail.contact}</PhoneNumber>
          </PhoneNumberWrapper>
        </PhoneNumberContainer>
      </PosterLayout>
      <ButtonWrapper>
        <Button fillButton onClick={() => makeImageHandler()}>
          포스터 저장하기
        </Button>
      </ButtonWrapper>
    </Layout>
  );
};

const PosterLayout = styled.div`
  background-color: ${(props) => props.theme.color.white};
`;

const HeadSpan = styled.div`
  height: 5rem;
  padding-top: 2rem;
  background-color: gray;
  display: flex;
  justify-content: center;
`;

const SecondSpan = styled.div`
  height: 5rem;
  padding-top: 2rem;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: center;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  background-image: url(${(props) => props.images});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;
const ImageMain = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  position: absolute;
  backdrop-filter: blur(3px);
`;

const QRCodeWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const LocationWrapper = styled.div``;

const InfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
`;

const BodyTitle = styled.div`
  display: flex;
  justify-content: sapce-between;
  width: 70px;
`;

const BodyTitleSvg = styled.div`
  flex-basis: 20px;
`;

const BodyTitleText = styled.span`
  flex-basis: 50px;
  padding-top: 2px;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #999999;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 220px;
  margin-top: 2px;
  span:first-child {
    margin-bottom: 8px;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: #222222;
`;

const PhoneNumberContainer = styled.div`
  ${FlexAttribute("row", "space-evenly")}
  padding: 16px 0;
  border-top: 1px solid ${(props) => props.theme.color.text_assistive};
`;

const PhonNumberTitle = styled.div`
  flex-basis: 70px;
`;

const PhoneNumberWrapper = styled.div`
  flex-basis: 210px;
`;
const PhoneNumber = styled.span``;

const ButtonWrapper = styled.div`
  width: 100%;
  ${FlexAttribute("row", "center", "center")}
`;

export default Poster;
