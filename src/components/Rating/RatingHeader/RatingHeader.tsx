import React from 'react';
import "../../welcome/WelcomeHeader/WelcomeHeader.css"
// @ts-ignore
import backSvgIcon from "../../../assets/vectorImages/back-svgrepo-com.svg";
import {Link} from "react-router-dom";

const RatingHeader = () => {
    return (
            <div className={`main_welcomeHeaderBlock`}>
                <Link to="/"><img src={backSvgIcon} alt="replay"/></Link>
            </div>
    );
};

export default RatingHeader;