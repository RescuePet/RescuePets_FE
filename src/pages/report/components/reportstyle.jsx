import styled from "styled-components";
import { FlexAttribute, SignSvgStyle } from "../../../style/Mixin"

export const ReportMissingContainer = styled.form`
  width: 100%;
  height: 83.375rem;
  ${FlexAttribute("column", "center", "center")}   
  gap: 10px 0;
  /* border: 1px solid #000; */
`;
export const ReportSightingContainer = styled.form`
  width: 100%;
  height: 78rem;
  padding-top: 30px;
  /* ${FlexAttribute("column", "center", "center")}    */
  ${FlexAttribute("column", "", "center")}   
  gap: 10px 0;
  border: 1px solid #000;
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
    /* border: 1px solid red; */
    ${props => props.theme.Title_700_18}
  }
`;

export const ReportAnimalInfoArea = styled.div`
  width: 20.9375rem;
  height: 23rem;
  margin: 0 auto;
  border: 1px solid red;
`;

export const ReportAnimalInfoBox = styled.div`
  width: 100%;
  height: 130px;
  /* border: 1px solid #0f0f0f; */
  margin: 0 auto;
  /* ${props => props.theme.FlexColumn} */
`;

export const ReportAnimalInfoCheckBox = styled.div`
    width: 100%;
    height: 50%;
    /* border: 1px solid red; */
    ${props => props.theme.FlexColumn}
`;
export const ReportAnimalInfoCheckBoxTitle = styled.div`
    width: 100%;
    height: 20%;
    > p {
        color: #666666;
        font-size: 12px;
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
     //선택된 Tabmenu 에만 적용되는 CSS를 구현
    border: 1px solid #666666;
    color: #666666
    }
`;

export const ReportAnimalInfoBoxColumn = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 5px;
  /* border: 1px solid blue; */
  font-size: 12px;
  ${props => props.theme.FlexRow}
 
`;

// 나이/체중
export const ReportAnimalInfoBoxColumnRow = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  > p { 
    color: #666666;
    ${props => props.theme.Body_400_12}
  }
  /* border: 1px solid red; */
  > img {
    position: absolute;
    width: 1rem;
    height: 1rem;
    bottom: 25px;
    right: 5px;
  }
`;

// 색상 
export const ReportAnimalInfoBoxColumnColunb = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  > p {
    color: #666666;
    ${props => props.theme.Body_400_12}
  }
  > img {
    position: absolute;
    bottom: 25px;
    width: 1rem;
    height: 1rem;
    right: 5px;
  }
  /* border: 1px solid red; */
`;

export const ReportanimaltypesBox = styled.div`
  width: 100%;
  height: 7.5rem;
  margin: 0 auto;
  ${props => props.theme.FlexColumn}
`;

export const ReportanimaltypesTitle = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  ${props => props.theme.Body_400_14}
`;

export const ReportanimaltypesSelect = styled.div`
  width: 20.9375rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    /* border: 1px solid blue; */
    padding: 10px 0 20px 0;
    > p {
    color: #666666;
    ${props => props.theme.Body_400_12}
    }
    > img {
    position: absolute;
    ${SignSvgStyle}   
    right: 5px;
    top: 25px;
    }
  }
`;

export const ReportanimaltypesSelectInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  /* border: 1px solid red; */
  border-bottom: 2px solid #EEEEEE;
  background: transparent;
  font-size: 12px;
`;

export const SelectBox = styled.div`
  position: relative;
  width: 9.75rem;
  height: 1.5625rem;
  border-bottom: 2px solid #EEEEEE;
  padding: 8px 0 20px 0;
  /* align-self: center; */
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 1px;
    right: 8px;
    color: #999999;
    font-size: 20px;
  }
`;
export const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 35px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  border-radius: 8px;
  background-color: #eeeeee;
  color: #222222;
  z-index: 10;
`;

export const Option = styled.li`
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

export const ReportKakaoMapBox = styled.div`
 position: relative;
  width: 20.9375rem;
  height: 14.875rem;
  margin: 0 auto;
  /* border: 1px solid blue; */
  ${props => props.theme.FlexColumn}
  gap: 10px 0;
`;

export const ReportKakaoMapBoxTitle = styled.div`
    width: 100%;
    height: 20%;
    > p {
        width: 100%;
        height: 20%;
        ${props => props.theme.Body_400_14}
        color: #222222;
    }
    > div {
        width: 100%;
        height: 80%;
        padding-top: 20px;
        font-size: 12px;
        ${props => props.theme.FlexRow}
        > div {
            width: 100%;
            height: 100%;
            > label {
                width: 9.75rem;
                border-bottom: 2px solid #EEEEEE;
            }
        }
    }
    
`;
export const ReportKakaoMapBoxMap = styled.div`
    z-index: 15;
    width: 100%;
    height: 80%;
    ${props => props.theme.FlexCenter}
`


export const ReportAnimalDayBox = styled.div`
  width: 20.9375rem;
  height: 5.5rem;
  margin: 0 auto;
  > p {
    width: 100%;
    height: 20px;
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
        color: #666666;
        font-size: 12px;
      }
      img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 25px;
        right: 5px;
      }
     span {
        padding-top: 5px;
        font-size: 12px;
        color: #EA5455;
        ${props => props.theme.FlexCenter}
      }
  }
  }
`;

export const ReportAnimalsignificantBox = styled.div`
  width: 20.9375rem;
  height: 9.75rem;
  margin: 0 auto;
`;

export const ReportAnimalsignificantBoxTitle = styled.div`
  width: 100%;
  height: 15%;
  > p{
    ${props => props.theme.Body_400_14};
  }
`;


export const ReportAnimalsignificantBoxInput = styled.div`
  width: 100%;
  height: 85%;
  /* border: 1px solid blue; */
  color: #222222;
  font-size: 20px;
  ${props => props.theme.FlexColumn}
  > div {
    position: relative;
    width: 100%;
    height: 50%;
    /* border: 1px solid red; */
    > p {
      color: #666666;
      font-size: 12px;
      padding-top: 10px;
    }
    > img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 25px;
        right: 5px;
      }
    > span {
      padding-top: 5px;
      font-size: 12px;
      color: #EA5455;
      ${props => props.theme.FlexCenter}
    }
  }
`;

export const ReportAnimalPictureArea = styled.div`
  position: relative;
  width: 8.25rem;
  height: 5.75rem;
  /* border: 1px solid red; */
  margin-right: 12.5rem;
`
export const ReportAnimalPictureAreaTitle = styled.div`
  width: 100%;
  height: 20%;
  color: #222222;
  font-size: 20px;
  /* border: 1px solid red; */
`;

export const ReportAnimalPictureAreaInputBox = styled.div`
  width: 100%;
  height: 80%;
  /* border: 1px solid gray; */
${props => props.theme.FlexCenter}
  gap: 0px 20px;
`;

export const ReportAnimalPictureInput = styled.div`
 width: 56px;
 height: 56px;
 background: #666666;
 border-radius: 4px;
 /* border: 1px solid red; */
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
 border-radius: 4px;
 /* border: 1px solid red; */
 ${props => props.theme.FlexCenter}
 > div {
  position: absolute;
  ${props => props.theme.FlexCenter}
  width: 16px;
  height: 16px;
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
  /* border: 1px solid red; */
  ${props => props.theme.FlexRow}
  > div {
    position: relative;
    width: 50%;
    height: 100%;
    > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    > img {
        position: absolute;
        width: 1rem; 
        height: 1rem;
        bottom: 45px;
        right: 15px;
      }
    > span {
      padding-top: 5px;
      font-size: 12px;
      color: #EA5455;
      ${props => props.theme.FlexCenter}
    }
  }
`;