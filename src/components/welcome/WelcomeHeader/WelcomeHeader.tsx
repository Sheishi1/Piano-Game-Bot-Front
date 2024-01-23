import React from 'react';
import "./WelcomeHeader.css"
// @ts-ignore
import cupSvgIcon from '../../../assets/vectorImages/cup-1-svgrepo-com (1).svg'
// @ts-ignore
import coinsSvgIcon from '../../../assets/vectorImages/coins-stacked-01-svgrepo-com.svg'

const WelcomeHeader = (props: { userName: string, coins: number, points: number}) => {
    return (
        <div className={`main_welcomeHeaderBlock`}>
            <div className="userName">{props.userName}</div>
            <div className="statisticWelcomeBlock">
                <div className="coinsCount"><img src={coinsSvgIcon} alt="replay" style={{marginRight: '5px'}}/>{props.coins}</div>
                <div className="maxPoints"><img src={cupSvgIcon} alt="replay" style={{marginRight: '5px'}}/>{props.points}</div>
            </div>
        </div>
    );
};

export default WelcomeHeader;