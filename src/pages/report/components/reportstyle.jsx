import styled from "styled-components";
import { FlexAttribute, SignSvgStyle } from "../../../style/Mixin"

export const ReportMissingContainer = styled.form`
  width: 100%;
  height: 83.375rem;
  ${FlexAttribute("column", "center", "center")}   
  gap: 10px 0;
`;
export const ReportSightingContainer = styled.form`
  width: 100%;
  height: 72rem;
  padding-top: 30px;
  ${FlexAttribute("column", "", "center")}   
  gap: 10px 0;
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
    ${props => props.theme.FlexCenter}
    ${props => props.theme.Title_700_18}
  }
`;

export const ReportAnimalInfoArea = styled.div`
  width: 20.9375rem;
  height: 23rem;
  margin: 0 auto;
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
  ${props => props.theme.Body_400_20_14}
`;

export const ReportanimaltypesSelect = styled.div`
  width: 20.9375rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    padding: 10px 0 20px 0;
    > p {
    color: ${props => props.theme.color.gary};
    ${props => props.theme.Body_400_12}
    }
    > img {
    position: absolute;
    ${SignSvgStyle}   
    right: 10px;
    top: 30px;
    }
    > span {
        ${props => props.theme.Span_alert}
    }
  }
`;

export const ReportAnimalInfoCheckBox = styled.div`
    width: 100%;
    height: 50%;
    ${props => props.theme.FlexColumn}
`;
export const ReportAnimalInfoCheckBoxTitle = styled.div`
    width: 100%;
    height: 20%;
    > p {
        color: ${props => props.theme.color.gary};
        ${props => props.theme.Body_400_12}
    }
`;
export const ReportAnimalInfoCheckBoxSelete = styled.ul`
    width: 100%;
    height: 80%;
    gap: 0 16px;
    ${props => props.theme.FlexCenter}
    > li {
        width: 6.3125rem;
        height: 2rem; 
        cursor: pointer;
    }
    .submenu {
        height: 2rem;
        border-radius: 1rem;
        border: 1px solid #CCCCCC;
        color: #CCCCCC;
        ${props => props.theme.FlexCenter}
        ${props => props.theme.Body_400_12}  
     }
    .focused { 
    border: 1px solid  ${props => props.theme.color.primary_nomal};
    color: ${props => props.theme.color.primary_nomal};
    }
`;

export const ReportAnimalInfoBoxColumn = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 5px;
  font-size: 12px;
  ${props => props.theme.FlexRow}
`;

// 나이/체중
export const ReportAnimalInfoBoxColumnRow = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  > p { 
    color: ${props => props.theme.color.gary};
    ${props => props.theme.Body_400_12}
  }
  > img {
    position: absolute;
    ${SignSvgStyle}   
    bottom: 30px;
    right: 10px;
  }
  > span {
    ${props => props.theme.Span_alert}
  }
`;

// 색상 
export const ReportAnimalInfoBoxColumnColumn = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > p {
    color: ${props => props.theme.color.gary};
    ${props => props.theme.Body_400_12}
  }
  > img {
    position: absolute;
    ${SignSvgStyle}   
    bottom: 30px; 
    right: 10px;
  }
  > span{
    ${props => props.theme.Span_alert}
  }
`;

export const ReportanimaltypesBox = styled.div`
  width: 100%;
  height: 7.5rem;
  margin: 0 auto;
  ${props => props.theme.FlexColumn}
`;


export const ReportInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  /* border: 1px solid red; */
  border-bottom: 2px solid ${props => props.theme.color.input_border};
  background: transparent;
  font-size: 12px;
`;

export const ReportLgInput = styled.input`
  width: 20.9375rem;
  height: 1.5625rem;
  margin-top: 5px;
  /* border: 1px solid red; */
  border-bottom: 2px solid${props => props.theme.color.input_border};
  background: transparent;
  font-size: 12px;
`;

export const ReportAnimalDayBox = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin: 0 auto;
  > p {
    ${props => props.theme.Body_400_14}
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
        color: ${props => props.theme.color.gary};
        ${props => props.theme.Body_400_12}
      }
      img {
        position: absolute;
        ${SignSvgStyle}   
        bottom: 25px;
        right: 10px;
      }
     span {
        ${props => props.theme.Span_alert}
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
  > p{
    ${props => props.theme.Body_400_14};
  }
`;


export const ReportAnimalSignificantBoxInputArea = styled.div`
  width: 100%;
  height: 85%;
  color: #222222;
  font-size: 20px;
  ${props => props.theme.FlexColumn}
  > div {
    position: relative;
    width: 100%;
    height: 50%;
    > p {
      color: ${props => props.theme.color.gray};
      ${props => props.theme.Body_400_12}
      padding-top: 10px;
    }
    > img {
      position: absolute;
      ${SignSvgStyle}   
      bottom: 25px;
      right: 15px;
      }
    > span {
        ${props => props.theme.Span_alert}
    }
  }
`;

export const ReportAnimalPictureArea = styled.div`
  position: relative;
  width: 18.75rem;
  height: 5.75rem;
  margin-right: 2.1875rem;
  /* border: 1px solid blue; */
  
`;
export const ReportAnimalPictureAreaTitle = styled.div`
  width: 100%;
  height: 20%;
  > p{
    ${props => props.theme.Body_400_14}
  }
`;

export const ReportAnimalPictureAreaInputBox = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  gap: 0px 20px;
`;

export const ReportAnimalPictureInput = styled.div`
 width: 56px;
 height: 56px;
 background: ${props => props.theme.color.gary};
 border-radius: 4px;
 ${props => props.theme.FlexCenter}
 > h3 {
  color: #FFFFFF;
  font-size: 2rem;
  font-weight: 200;
 }
`;
export const ReportAnimalPicturePreview = styled.div`
 position: relative;
 width: 56px;
 height: 56px;
 background: #EEEEEE;
 border-radius: .25rem;
 ${props => props.theme.FlexCenter}
 > div {
  position: absolute;
  ${props => props.theme.FlexCenter}
  width: 1rem;
  height: 1rem;
  background: #FFFFFF;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  font-size: 6px;
  color: #CCCCCC;
 }
 > img {
  width: 100%;
  height: 100%;
 }
`;

export const ReportAnimalUserInfo = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin-top: 10px;
  ${props => props.theme.FlexRow}
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    > p {
     ${props => props.theme.Body_400_20_14}
    }
    > img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 45px;
        right: 15px;
      }
    > span {
        ${props => props.theme.Span_alert}
    }
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`