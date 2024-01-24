import React from 'react';
// @ts-ignore
import coinsSvgIcon from "../../assets/vectorImages/coins-stacked-01-svgrepo-com.svg";
// @ts-ignore
import cupSvgIcon from "../../assets/vectorImages/cup-1-svgrepo-com (1).svg";
// @ts-ignore
import backSvgIcon from "../../assets/vectorImages/back-svgrepo-com.svg";
import {Link} from "react-router-dom";

const ShopHeader = (props: {coins: number}) => {
    return (
        <div className={`main_welcomeHeaderBlock`}>
            <Link to="/"><img src={backSvgIcon} alt="replay"/></Link>
            <div className="statisticWelcomeBlock">
                <div className="coinsCount"><img src={coinsSvgIcon} alt="replay" style={{marginRight: '5px'}}/>{props.coins}</div>
            </div>
        </div>
    );
};

export default ShopHeader;