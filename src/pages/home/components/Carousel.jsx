import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevTo></PrevTo>,
    nextArrow: <NextTo></NextTo>,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <Container>
      <StyledSlider {...settings}>
        {images.map((item, index) => (
          <Link key={`carousel-image-${index}`} to={item.linkUrl}>
            <Image src={item.imageUrl} alt="imageUrl" />
          </Link>
        ))}
      </StyledSlider>
    </Container>
  );
};

const StyledSlider = styled(Slider)`
  .custom-dots {
    bottom: 0;
    background-color: transparent;
  }
  .custom-dots li {
    background-color: transparent;
  }
  .slick-dots li button {
    width: 0.375rem;
    height: 0.375rem;
  }

  .slick-dots li button:before {
    color: ${(props) => props.theme.color.white};
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
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 10rem;
  object-fit: cover;
`;

const PrevTo = styled.div`
  left: 0.625rem;
  z-index: -1;
`;

const NextTo = styled.div`
  right: 0.625rem;
  z-index: -1;
`;

export default Carousel;
