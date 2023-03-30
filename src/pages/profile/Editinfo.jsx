import React from 'react'
import styled from 'styled-components'
import Layout from '../../layouts/Layout'
import { HeaderStyle } from '../../style/Mixin'
import close from "../../asset/Close.svg"
import { useNavigate } from 'react-router-dom'
// import 
const Editinfo = () => {
    const navigate = useNavigate()
    const MoveToBackPage = () => {
        navigate(-1)
    }
    return (
        <Layout>
            <EditInfoHeader>
                <div></div>
                <div><h2>프로필 수정하기</h2></div>
                <div><img src={close} onClick={MoveToBackPage} /></div>
            </EditInfoHeader>

            <EditInfoImgBox>

            </EditInfoImgBox>
        </Layout>
    )
}

export default Editinfo

const EditInfoHeader = styled.div`
  ${HeaderStyle}
  ${props => props.theme.FlexRow}
  > div {
    width: 33.3%;
    border: 1px solid red;
    ${props => props.theme.FlexCenter}
    > h2 {
        ${props => props.theme.Body_500_16}
        color: ${props => props.theme.color.black};
    }
  }
`;

const EditInfoImgBox = styled.div`
    width: 100%;
    height: 7.5rem;
    border: 1px solid red;
    ${props => props.theme.FlexCenter}
`;

const EditInfoImgBack = styled.div`
    width: 5rem;
    height: 5.375rem;
    
`