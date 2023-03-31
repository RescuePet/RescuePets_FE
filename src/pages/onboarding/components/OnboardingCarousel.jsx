import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import onboarding1 from "../../../asset/onboarding/1.png";
import onboarding2 from "../../../asset/onboarding/2.png";
import onboarding3 from "../../../asset/onboarding/3.png";
import Button from "../../../elements/Button";
import { useNavigate } from "react-router-dom";

const OnboardingCarousel = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleAfterChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevTo></PrevTo>,
    nextArrow: <NextTo></NextTo>,
    afterChange: handleAfterChange,
  };

  const onBoardingData = [
    {
      imageURL: onboarding1,
      contents: "API기반으로 실시간유기동물을 구할 수 있어요!",
    },
    {
      imageURL: onboarding2,
      contents: "편하고 빠르게 잃어버린 반려동물을 등록해보세요!",
    },
    {
      imageURL: onboarding3,
      contents: "유기 동물의 가족이 되어주세요!",
    },
  ];

  const navigateHandler = () => {
    navigate("/signin");
  };

  return (
    <>
      <SkipOnBoarding onClick={navigateHandler}>
        {activeIndex === 2 ? "CLOSE" : "SKIP"}
      </SkipOnBoarding>
      <Container>
        <StyledSlider ref={sliderRef} {...settings}>
          {onBoardingData.map((image, index) => (
            <div key={`onBoarding-item-${index}`}>
              <Image src={image.imageURL} />
              <Contents>{image.contents}</Contents>
            </div>
          ))}
        </StyledSlider>
      </Container>
      <OnboardingActive
        propName={activeIndex === 2 ? "fillButton" : "emptyButton"}
        onClick={activeIndex === 2 ? navigateHandler : handleNext}
      >
        {activeIndex === 2 ? "시작하기" : "다음으로"}
      </OnboardingActive>
    </>
  );
};

const SkipOnBoarding = styled.button`
  position: absolute;
  top: 3%;
  right: calc(50% - 190px);
  ${(props) => props.theme.Body_500_16};
  color: ${(props) => props.theme.color.text_alternative};
`;

const StyledSlider = styled(Slider)`
  ul {
    bottom: 0px;
  }

  .slick-dots li button {
    width: 0.375rem;
    height: 0.375rem;
  }

  .slick-dots li button:before {
    color: ${(props) => props.theme.color.text_assistive};
    opacity: 1;
  }

  .slick-dots li.slick-active button:before {
    content: "";
    width: 1.4375rem;
    height: 0.5rem;
    background-color: ${(props) => props.theme.color.primary_normal};
    border-radius: 0.625rem;
    margin-top: 0.3125rem;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: auto;
  position: relative;
`;

const Image = styled.img`
  margin: 0 auto;
  max-width: 65%;
  height: 15rem;
  object-fit: contain;
  backdrop-filter: blur(0.1875rem);
`;

const Contents = styled.h2`
  margin: 40px auto;
  width: 200px;
  text-align: center;
  word-break: keep-all;
  ${(props) => props.theme.Title_700_18};
  line-height: 24px;
`;

const PrevTo = styled.div`
  left: 0.625rem;
  z-index: 10;
  visibility: hidden;
`;

const NextTo = styled.div`
  right: 0.625rem;
  z-index: 10;
  visibility: hidden;
`;

const OnboardingActive = styled(Button)`
  margin: 0 auto 30px auto;
`;

export default OnboardingCarousel;
