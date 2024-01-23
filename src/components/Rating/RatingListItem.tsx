import React from 'react';
import "./RatingPage.css";
// @ts-ignore
import cupSvgIcon from '../../assets/vectorImages/cup-1-svgrepo-com (1).svg'


const RatingListItem = (props: {userName: string, points: number, position: number}) => {
    return (
        <div className={`main__ratingListItemBlock`}>
            <span>{props.position}</span>
            <span>{props.userName}</span>
            <div className="coinsCount"><img src={cupSvgIcon} alt="replay" style={{marginRight: '5px'}}/>{props.points}</div>
        </div>
    );
};

export default RatingListItem;