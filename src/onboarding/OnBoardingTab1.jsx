import React, { useState } from 'react'
import styled from 'styled-components'



const OnBoardingTab1 = (props) => {

    const [tabCount1, setTabCount1] = useState(1);
    // console.log(tabCount1)

    const onClickTabBtn = () => {
        props.propFunction(tabCount1)
    }

    return (
        <>
            <TabContainer>
                <TabImageBox>
                    <div></div>
                </TabImageBox>

                <TabTextBox>
                    <h3>공공API를 활용한 구조된 유기동물에
                        대한정보를 제공합니다!
                    </h3>
                </TabTextBox>

                <TabButtonBox>

                    <TabThisBox></TabThisBox>
                    <TabNoneThisBox></TabNoneThisBox>
                    <TabNoneThisBox></TabNoneThisBox>

                </TabButtonBox>

                <TabNextButtonArea onClick={onClickTabBtn}>다음</TabNextButtonArea>
            </TabContainer>
        </>
    )
}

export default OnBoardingTab1

const TabContainer = styled.div`
    width: 100%;
    height: 100vh;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
`;


const TabImageBox = styled.div`
    width: 80%;
    height: 50%;
    /* border: 1px solid blue; */
    ${(props) => props.theme.FlexColumn}
    div {
        width: 264px;
        height: 264px;
        background: #D9D9D9;
        border-radius: 50%;
    }
`;

const TabTextBox = styled.div`
    width: 80%;
    height: 10%;
    margin-top: 1.5625rem;
`



const TabButtonBox = styled.div`
    width: 50%;
    height: 3%;
    /* border: 1px solid red; */
    ${(props) => props.theme.FlexCenter}
    gap: 0 10px;
  
    /* 23 */
`;

const TabThisBox = styled.div`
    width: 23px;
    height: 8px;
    background: #D9D9D9;
    border-radius: 10px;
`;

const TabNoneThisBox = styled.div`
        width: 8px;
        height: 8px;
        background: #D9D9D9;
        border-radius: 10px;
`


const TabNextButtonArea = styled.div`
    width: 335px;
    height: 56px;
    margin-top: 100px;
    border: 1px solid #d9d9d9;
    border-radius: 1rem;
    ${(props) => props.theme.FlexCenter}
`;