import React, { useEffect, useState } from 'react';
import axios from "axios";
//@ts-ignore
import heartSvgIcon from "../../../../assets/vectorImages/heart-svgrepo-com.svg";
//@ts-ignore
import closeSvgBtn from "../../../../assets/vectorImages/close-bold-svgrepo-com.svg";
import "./NextGameBlock.css";

const NextGameBlock = (props: {userId: number, userHearts: number, finalBlackKeysClicked: number, coins: number, onContinue: Function}) => {
    const [timeLeft, setTimeLeft] = useState(3);
    const [isVisible, setIsVisible] = useState(true);

    const fetchDecreaseHearts = async () => {
        try {
            const response = await axios.post(
                'https://pianobot.dutx.site/api/user/hearts/decrease',
                {
                    userId: props.userId,
                }
            )
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [timeLeft]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`main__NextGameBlock`}>
            <div className="topNextBlock">
                {Array.from({ length: props.userHearts }).map((_, index) => (
                    <img key={index} src={heartSvgIcon} alt="heartSvgIcon" style={{marginRight: '5px'}}/>
                ))}
            </div>
            <button className={`nextBtn`} onClick={() => {
                fetchDecreaseHearts();
                setIsVisible(false);
                props.onContinue(props.finalBlackKeysClicked, props.coins);
            }}>Продолжить
            </button>
            {timeLeft > 0 ? (
                <div className="timerProgress" style={{width: `${timeLeft / 3 * 100}%`}}/>
            ) : (
                <img src={closeSvgBtn} alt="close" className={`closeNextBlock`} onClick={() => setIsVisible(false)}/>
            )}
        </div>
    );
};

export default NextGameBlock;