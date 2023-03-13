import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from '../../elements/Button'



const OnBoardingTab1 = (props) => {
    const navigate = useNavigate()
    const [tabCount1, setTabCount1] = useState(1);

    const onClickTabBtn = () => {
        props.propFunction(tabCount1)
    }

    return (
        <>

            <TabContainer>
                <TabHander onClick={() => { navigate('/signin') }}>Skip</TabHander>
                <TabImageBox>
                    <div></div>
                </TabImageBox>

                <TabTextBox>
                    <h3>API기반으로 실시간
                        유기동물을 구할 수 있어요!
                    </h3>
                </TabTextBox>

                <TabButtonBox>
                    <TabThisBox></TabThisBox>
                    <TabNoneThisBox></TabNoneThisBox>
                    <TabNoneThisBox></TabNoneThisBox>
                </TabButtonBox>

                <TabNextButtonArea >
                    <Button onClick={onClickTabBtn}>다음</Button>
                </TabNextButtonArea>
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
    padding-top: 10px;
`;
const TabHander = styled.div`
    width: 100%;
    height: 5%;
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 20px;
    font-weight: 700;
    cursor: pointer;
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
    padding: 0 50px;
    text-align: center;
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
    margin-top: 100px;
    ${(props) => props.theme.FlexCenter}
`;
