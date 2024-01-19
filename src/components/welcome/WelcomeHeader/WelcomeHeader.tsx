import React from 'react';
import "./WelcomeHeader.css"

const WelcomeHeader = (props: { userName: string, coins: string, points: string}) => {
    return (
        <div className={`main_welcomeHeaderBlock`}>
            <div className="userName">{props.userName}</div>
            <div className="statisticWelcomeBlock">
                <div className="coinsCount">{props.coins}</div>
                <div className="maxPoints">{props.points}</div>
            </div>
        </div>
    );
};

export default WelcomeHeader;