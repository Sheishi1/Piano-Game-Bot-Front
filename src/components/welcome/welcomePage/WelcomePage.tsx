import React from 'react';
import "./WelcomePage.css"
import Selectmode from "../selectMode/Selectmode";
import WelcomeHeader from "../WelcomeHeader/WelcomeHeader";

const WelcomePage = (props: {userName: string, coins: string, points: string}) => {
    return (
        <div className={`main__welcomePageBlock`}>
            <div className="welcomePageBg"/>
            <WelcomeHeader userName={props?.userName!} coins={props?.coins!} points={props?.points!} />
            <Selectmode/>
        </div>
    );
};

export default WelcomePage;