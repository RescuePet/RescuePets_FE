import React from 'react'
import styled from 'styled-components'
import Layout from '../../../layouts/Layout'
import { HeaderStyle } from '../../../style/Mixin'
// import 
const Editinfo = () => {
    return (
        <Layout>
            <EditInfoHeader>
                <div></div>
                <div><h2>프로필 수정하기</h2></div>
                <div></div>


            </EditInfoHeader>
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
`