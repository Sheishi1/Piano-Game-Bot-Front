import React from 'react';
import "./WelcomePage.css"
import Selectmode from "../selectMode/Selectmode";

const WelcomePage = () => {
    return (
        <div className={`main__welcomePageBlock`}>
            <div className="welcomePageBg"/>
            <Selectmode/>
        </div>
    );
};

export default WelcomePage;