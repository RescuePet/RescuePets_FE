import React from "react";
import styled, { css } from "styled-components";

const Btn = ({ children, ...props }) => {
    return (
        <>
            <BtnStyle onClick={props.deleteItem} {...props}>
                {children}
            </BtnStyle>
        </>
    );
};

const BtnStyle = styled.button`
   width: 20.9375rem;
    height: 3.5rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border-radius: .25rem;
    ${(props) => props.theme.FlexCenter}
    ${(props) =>
        props.TabBtn &&
        css`
       margin-top: 100px;
       border: 1px solid #d9d9d9;
    `}
    ${(props) =>
        props.TabBtn2 &&
        css`
       margin-top: 100px;
       background: #d9d9d9;
    `}
`;

export default Btn;