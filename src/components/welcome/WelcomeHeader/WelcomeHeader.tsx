import React from 'react';
import "./WelcomeHeader.css"

const WelcomeHeader = (props: { userName: string, coins: string, points: string}) => {
    return (
        <div className={`main_welcomeHeaderBlock`}>
            <div className="userName">{props.userName ? "zxc" : "zxc"}</div>
            <div className="statisticWelcomeBlock">
                <div className="coinsCount">{props.coins ? "zxc" : "zxc"}</div>
                <div className="maxPoints">{props.points ? "zxc" : "zxc"}</div>
            </div>
        </div>
    );
};

export default WelcomeHeader;