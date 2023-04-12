import styled from "styled-components";
import {
  FlexAttribute,
  SignSvgStyle,
  Border_1_color,
} from "../../../style/Mixin";

export const ReportMissingContainer = styled.form`
  width: 100%;
  height: 83.375rem;
  ${FlexAttribute("column", "center", "center")}
  gap: .625rem 0;
`;
export const ReportSightingContainer = styled.form`
  width: 100%;
  height: 72rem;
  ${FlexAttribute("column", "", "center")}
  gap: .625rem 0;
`;

export const ReportHeader = styled.div`
  width: 100%;
  height: 2.625rem;
  border-bottom: 0.25rem solid #eeeeee;
  font-size: 1.125rem;
  font-weight: 700;
  ${FlexAttribute("", "center", "space-around")}
  color: #222222;
  > div {
    height: 100%;
    width: 33.3%;
    ${(props) => props.theme.FlexCenter}
    ${(props) => props.theme.Title_700_18}
    >img {
      cursor: pointer;
    }
  }
`;

export const ReportAnimalInfoArea = styled.div`
  width: 20.9375rem;
  height: 28.125rem;
  margin: 0 auto;
`;

export const ReportAnimalTabBox = styled.div`
  width: 100%;
  height: 12.5rem;
`;

export const ReportAnimalInfoBox = styled.div`
  width: 100%;
  height: 8.125rem;
  margin: 0 auto;
`;

export const ReportanimaltypesTitle = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  ${(props) => props.theme.Body_400_20_14}
`;

export const ReportanimaltypesSelect = styled.div`
  width: 20.9375rem;
  height: 3.75rem;
  display: flex;

  > div {
    position: relative;
    width: 50%;
    height: 100%;
    padding: 0.625rem 0 1.25rem 0;
    > p {
      color: ${(props) => props.theme.color.gray};
      ${(props) => props.theme.Body_400_12}
    }
    > img {
      position: absolute;
      ${SignSvgStyle}
      right: .625rem;
      top: 1.875rem;
    }
    > span {
      ${(props) => props.theme.Span_alert}
    }
  }
`;

export const ReportAnimalInfoBoxColumn = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 0.3125rem;
  font-size: 0.75rem;
  ${(props) => props.theme.FlexRow}
`;

// 나이/체중
export const ReportAnimalInfoBoxColumnRow = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  > p {
    color: ${(props) => props.theme.color.gray};
    ${(props) => props.theme.Body_400_12}
  }
  > img {
    position: absolute;
    ${SignSvgStyle}
    bottom: 1.6875rem;
    right: 0.625rem;
  }
  > span {
    ${(props) => props.theme.Span_alert}
  }
`;

// 색상
export const ReportAnimalInfoBoxColumnColumn = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > p {
    color: ${(props) => props.theme.color.gray};
    ${(props) => props.theme.Body_400_12}
  }
  > img {
    position: absolute;
    ${SignSvgStyle}
    bottom: 1.875rem;
    right: 0.625rem;
  }
  > span {
    ${(props) => props.theme.Span_alert}
  }
`;

export const ReportanimaltypesBox = styled.div`
  width: 100%;
  height: 7.5rem;
  margin: 0 auto;
  ${(props) => props.theme.FlexColumn}
`;

export const ReportInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 0.3125rem;
  ${Border_1_color}
  border-radius: 0;
  background: transparent;
  font-size: 12px;
`;

export const ReportLgInput = styled.input`
  width: 20.9375rem;
  height: 1.5625rem;
  margin-top: 0.3125rem;
  border-radius: 0;
  ${Border_1_color}
  background: transparent;
  font-size: 0.75rem;
`;

export const ReportAnimalDayBox = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin: 0 auto;
  > p {
    ${(props) => props.theme.Body_400_14}
  }
  > div {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    flex-direction: row;
    > div {
      position: relative;
      width: 50%;
      height: 100%;
      p {
        padding-top: 10px;
        color: ${(props) => props.theme.color.gray};
        ${(props) => props.theme.Body_400_12}
      }
      img {
        position: absolute;
        ${SignSvgStyle}
        bottom: 1.5625rem;
        right: 0.625rem;
      }
      span {
        ${(props) => props.theme.Span_alert}
      }
    }
  }
`;

export const ReportAnimalSignificantBox = styled.div`
  width: 20.9375rem;
  height: 9.75rem;
  margin: 0 auto;
`;

export const ReportAnimalSignificantBoxTitle = styled.div`
  width: 100%;
  height: 15%;
  > p {
    ${(props) => props.theme.Body_400_14};
  }
`;

export const ReportAnimalSignificantBoxInputArea = styled.div`
  width: 100%;
  height: 85%;
  color: #222222;
  font-size: 1.25rem;
  ${(props) => props.theme.FlexColumn}
  > div {
    position: relative;
    width: 100%;
    height: 50%;
    > p {
      color: ${(props) => props.theme.color.gray};
      ${(props) => props.theme.Body_400_12}
      padding-top: .625rem;
    }
    > img {
      position: absolute;
      ${SignSvgStyle}
      bottom: 1.0938rem;
      right: 0.9375rem;
    }
    > span {
      ${(props) => props.theme.Span_alert}
    }
  }
`;

export const ReportAnimalPictureArea = styled.div`
  position: relative;
  width: 18.75rem;
  height: 5.75rem;
  margin-right: 2.1875rem;
`;
export const ReportAnimalPictureAreaTitle = styled.div`
  width: 100%;
  height: 20%;
  > p {
    ${(props) => props.theme.Body_400_14}
  }
`;

export const ReportAnimalPictureAreaInputBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  gap: 0px 1.25rem;
`;

export const ReportAnimalPictureInput = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: ${(props) => props.theme.color.gray};
  border-radius: 0.25rem;
  ${(props) => props.theme.FlexCenter}
  > h3 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 200;
  }
`;
export const ReportAnimalPicturePreview = styled.div`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  background: #eeeeee;
  border-radius: 0.25rem;
  ${(props) => props.theme.FlexCenter}
  > div {
    position: absolute;
    ${(props) => props.theme.FlexCenter}
    width: 1rem;
    height: 1rem;
    background: #ffffff;
    top: -0.3125rem;
    right: -0.3125rem;
    border-radius: 50%;
    font-size: 0.375rem;
    color: #cccccc;
  }
  > img {
    width: 100%;
    height: 100%;
  }
`;

export const ReportAnimalUserInfo = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin-top: 0.625rem;
  ${(props) => props.theme.FlexRow}
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    > p {
      ${(props) => props.theme.Body_400_20_14}
    }
    > img {
      position: absolute;
      width: 1rem;
      height: 1rem;
      bottom: 2.8125rem;
      right: 0.9375rem;
    }
    > span {
      ${(props) => props.theme.Span_alert}
    }
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`;
