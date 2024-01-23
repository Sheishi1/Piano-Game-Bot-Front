import React from 'react';
import "./RatingPage.css";
// @ts-ignore
import cupSvgIcon from '../../assets/vectorImages/cup-1-svgrepo-com (1).svg'


const RatingListItem = (props: {userName: string, points: number, position: number, highlight: boolean}) => {
    const listItemStyle = props.highlight ? {border: '1px solid white', borderRadius: '15px'} : {};

    return (
        <div style={listItemStyle}>
            <div className={`main__ratingListItemBlock`}>

                <span>{props.highlight ?  `${props.position}. Вы` : `${props.position}. ${props.userName}`}</span>
                <div className="ratingPointsCount"><img src={cupSvgIcon} alt="replay" style={{marginRight: '5px'}}/>{props.points}</div>
            </div>
        </div>
    );
};

export default RatingListItem;