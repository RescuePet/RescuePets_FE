import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layouts/Layout";
import styled from "styled-components";
import Title from "./components/Title";
import Button from "../../elements/Button";
import {
  Border_2_color,
  FlexAttribute,
  PostBorderStyle,
} from "../../style/Mixin";
import { useDispatch, useSelector } from "react-redux";
import { __getMissingPostDetail } from "../../redux/modules/petworkSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import locationSVG from "../../asset/location.svg";
import time from "../../asset/time.svg";
import informationIcon from "../../asset/information.svg";
import Memo from "../../asset/Memo";
import gratuity from "../../asset/gratuity.svg";
import petworkRefineData from "../../utils/petworkRefine";
import { instance } from "../../utils/api";
import { Loading } from "../../components/Loading";

import {
  initAmplitude,
  logEvent,
  setAmplitudeUserId,
  resetAmplitude,
} from "../../utils/amplitude";
import isLogin from "../../utils/isLogin";

const Poster = () => {
  // 앰플리튜드
  const location = useLocation();
  useEffect(() => {
    initAmplitude();
    logEvent(`enter_/${location.pathname.split("/")[1]}`);
    if (isLogin()) {
      setAmplitudeUserId();
    }
    return () => {
      resetAmplitude();
    };
  }, []);

  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [imageURLState, setImageURLState] = useState("");
  const [poster, setPoster] = useState();

  const { missingPostDetail } = useSelector((state) => state?.petwork);
  const { imageURL } = useSelector((state) => state.MissingData);

  const refineData = petworkRefineData(missingPostDetail);

  const titleInfo = {
    state: "실종",
    kindCd: missingPostDetail.kindCd,
    upkind: refineData.upkind,
    sexCd: refineData.sexCd,
    info: refineData.information.join("/"),
  };

  // html2canvas를 사용
  const makeImageHandler = async () => {
    try {
      const canvas = await html2canvas(containerRef.current);
      const posterBlob = canvas.toBlob((blob) => {
        submitImage(blob);
        setPoster(blob);
        return blob;
      });
      setPoster(posterBlob);
    } catch (error) {
      console.log(error);
    }
  };

  // 서버에 이미지 전송
  const submitImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("postPoster", image);
      await instance.post(`/api/post/posters/${id}`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(__getMissingPostDetail(id)).then(() => {
      makeImageHandler();
    });
  }, [id]);

  if (JSON.stringify(missingPostDetail) === "{}") {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const fileToImageUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        resolve(reader.result);
      });

      reader.addEventListener("error", () => {
        reject(new Error("파일 읽기 실패"));
      });

      reader.readAsDataURL(file);
    });
  };

  const ImageHandler = () => {
    const file = imageURL;

    if (file) {
      fileToImageUrl(file)
        .then((url) => setImageURLState(url))
        .catch((error) => console.log(error));
    }
  };
  ImageHandler();

  // Save Poster
  const savePoster = async () => {
    try {
      const canvas = await html2canvas(containerRef.current);
      canvas.toBlob((blob) => {
        saveAs(blob);
        logEvent("make_MissingPoster");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <PosterLayout ref={containerRef}>
        <SecondSpan>동물을 찾습니다</SecondSpan>
        <ImageWrapper images={imageURLState}>
          <ImageMain src={imageURLState} />
          <QRCodeWrapper>
            <QRCode
              id="qrcode"
              value={`rescuepets.co.kr/missingdetail/${missingPostDetail.id}`}
              fgColor="#ffffff"
              bgColor="transparent"
              size="80"
            />
          </QRCodeWrapper>
        </ImageWrapper>
        <TitleWrapper>
          <Title titleInfo={titleInfo}></Title>
        </TitleWrapper>
        <LocationWrapper>
          <InfoWrapper>
            <BodyTitleWrapper>
              <BodyTitleSvg src={locationSVG} />
              <BodyTitleText>위치</BodyTitleText>
            </BodyTitleWrapper>
            <ContentTextWrapper>
              <ContentText>{missingPostDetail.happenPlace}</ContentText>
            </ContentTextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <BodyTitleWrapper>
              <BodyTitleSvg src={time} />
              <BodyTitleText>실종일시</BodyTitleText>
            </BodyTitleWrapper>
            <ContentTextWrapper>
              <ContentTextBox>
                <ContentOptionText>
                  {missingPostDetail.happenDt} |{" "}
                </ContentOptionText>
                &nbsp;
                <ContentText>{missingPostDetail.happenHour}</ContentText>
              </ContentTextBox>
            </ContentTextWrapper>
          </InfoWrapper>
          {missingPostDetail.specialMark && (
            <InfoWrapper>
              <BodyTitleWrapper>
                <BodyTitleSvg src={informationIcon} />
                <BodyTitleText>특징</BodyTitleText>
              </BodyTitleWrapper>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.specialMark}</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}
          {missingPostDetail.content && (
            <InfoWrapper>
              <BodyTitleWrapper>
                <Memo />
                <BodyTitleText>메모</BodyTitleText>
              </BodyTitleWrapper>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.content}</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}
          {missingPostDetail.gratuity && (
            <InfoWrapper>
              <BodyTitleWrapper>
                <BodyTitleSvg src={gratuity} />
                <BodyTitleText>사례금</BodyTitleText>
              </BodyTitleWrapper>
              <ContentTextWrapper>
                <ContentText>{missingPostDetail.gratuity}원</ContentText>
              </ContentTextWrapper>
            </InfoWrapper>
          )}
        </LocationWrapper>
        <PhoneNumberContainer>
          <PhonNumberTitle>연락처</PhonNumberTitle>
          <PhoneNumberWrapper>
            <PhoneNumber>{missingPostDetail.contact}</PhoneNumber>
          </PhoneNumberWrapper>
        </PhoneNumberContainer>
      </PosterLayout>
      <ButtonWrapper>
        <Button fillButton onClick={savePoster}>
          포스터 저장하기
        </Button>
        <Button
          emptyButton
          onClick={() => navigate(`/missingdetail/${missingPostDetail.id}`)}
        >
          상세보기
        </Button>
      </ButtonWrapper>
    </Layout>
  );
};

const PosterLayout = styled.div`
  background-color: ${(props) => props.theme.color.white};
`;

const SecondSpan = styled.div`
  height: 5rem;
  padding-top: 2rem;
  border-radius: 0.625rem 0.625rem 0 0;
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  ${FlexAttribute("row", "center", "center")}
  width: 100%;
  height: 15rem;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.2)
    ),
    url(${(props) => props.images});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const ImageMain = styled.img`
  height: 240px;
  object-fit: contain;
  backdrop-filter: blur(0.1875rem);
`;

const TitleWrapper = styled.div`
  ${FlexAttribute("row", "center", "center")}
  margin: 1rem auto;
  padding-bottom: 1rem;
  width: 100%;
  ${Border_2_color}
`;

const QRCodeWrapper = styled.div`
  padding: 0.625rem;
  margin: 0.625rem;
  border-radius: 0.25rem;
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const LocationWrapper = styled.div`
  ${PostBorderStyle}
`;

const InfoWrapper = styled.div`
  ${FlexAttribute("row", "space-evenly")}
`;

const BodyTitleWrapper = styled.div`
  ${FlexAttribute("row", "center")}
  width: 5rem;
`;

const BodyTitleSvg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const BodyTitleText = styled.span`
  flex-basis: 3.125rem;
  font-weight: 400;
  margin-left: 0.25rem;
  padding-top: 0.0625rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #999999;
  white-space: nowrap;
`;

const ContentTextWrapper = styled.div`
  flex-basis: 13.75rem;
  margin-top: 0.125rem;
  span:first-child {
    margin-bottom: 0.5rem;
  }
`;

const ContentTextBox = styled.div`
  ${FlexAttribute("row")}
`;

const ContentOptionText = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #666666;
`;

const ContentText = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: #222222;
`;

const PhoneNumberContainer = styled.div`
  ${FlexAttribute("row", "space-evenly")}
  padding: 1rem 0;
  border-top: 0.0625rem solid ${(props) => props.theme.color.text_assistive};
`;

const PhonNumberTitle = styled.div`
  flex-basis: 4.375rem;
  ${(props) => props.theme.Body_400_14};
`;

const PhoneNumberWrapper = styled.div`
  flex-basis: 13.125rem;
`;
const PhoneNumber = styled.span`
  ${(props) => props.theme.Body_400_14};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  ${FlexAttribute("column", "center", "center")}

  button:last-child {
    margin: 20px 0;
  }
`;

export default Poster;
