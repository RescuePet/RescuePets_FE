import React, { useState } from 'react'
import Layout from '../../../layouts/Layout'
import OnBoardingTab1 from './OnBoardingTab1'
import OnBoardingTab2 from './OnBoardingTab2'
import OnBoardingTab3 from './OnBoardingTab3'



const OnBoarding = () => {

    const [tabCount, setTabCounter] = useState(0)

    // 하위컴포넌트에서 값을 가져옴 
    const highFunction = (tabCount1) => {
        // console.log("탭1번에서 가져온값", tabCount1);
        setTabCounter(tabCount1)
    }

    const highFunction2 = (tabCount2) => {
        // console.log("탭2번에서 가져온값", tabCount2);
        setTabCounter(tabCount2)
    }

    // 0
    const highFunction3 = (tabCount3) => {
        console.log("탭2번에서 가져온값", tabCount3);
        setTabCounter(tabCount3)
    }




    return (
        <Layout>
            {
                tabCount === 0 ?
                    <OnBoardingTab1 propFunction={highFunction} /> :
                    (tabCount === 1) ?
                        <OnBoardingTab2 propFunction2={highFunction2} /> :
                        <OnBoardingTab3 propFunction3={highFunction3} />
            }
        </Layout>
    )
};

export default OnBoarding;
