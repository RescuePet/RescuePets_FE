import React from 'react'
import styled, { css } from 'styled-components'

const Input = ({ children, ...props }) => {
  return <DefailtInput  {...props}>{children}</DefailtInput>;
}


export default Input
const DefailtInput = styled.input`
  width: 9.75rem;
  height: 1.5625rem;
  margin-top: 5px;
  border-bottom: 2px solid #EEEEEE;
  background: transparent;
  font-size: 12px;
  cursor: pointer;
  ${(props) =>
    props.lg &&
    css`
     width: 335px;
    `}
     ${(props) =>
    props.signlg &&
    css`
     width: 335px;
     height: 2.875rem;
     font-size: 12px;
     ::placeholder {
    color: #cccccc;
  }
    
    `}
    &:hover {
    cursor: pointer;
    transition: 0.2s ease;
  }
`;
