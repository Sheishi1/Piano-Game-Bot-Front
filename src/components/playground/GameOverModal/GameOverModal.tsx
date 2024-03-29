import React, {useEffect, useState} from 'react';
import "./GameOverModal.css";
// @ts-ignore
import svgHomeIcon from '../../../assets/vectorImages/house-svgrepo-com (1).svg'
// @ts-ignore
import svgReplayIcon from '../../../assets/vectorImages/multimedia-refresh-replay-video-icon-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserData} from "../../../Models/UserData";
import NextGameBlock from "./NextGameBlock/NextGameBlock";

// @ts-ignore
const GameOverModal = ({userId, userHearts, finalBlackKeysClicked, restartGame, coins}) => {
    const [data, setData] = useState<UserData | null>(null);
    const nav = useNavigate();
    const [showGameOverModal, setShowGameOverModal] = useState(false);

    useEffect(() => {

    }, [userId, coins, finalBlackKeysClicked]);

    const fetchUpdateUserData = async () => {
        try {
            const response = await axios.post(
                'https://pianobot.dutx.site/api/user/info/update',
                {
                    userId: userId,
                    coins: coins,
                    points: finalBlackKeysClicked
                }
            )
        } catch (e) {
            console.log(e)
        }
    }
    fetchUpdateUserData()

    return (
        <>
            <div className="modal-overlay"/>
            {userHearts > 0 && !showGameOverModal ? (
                <NextGameBlock userId={userId} userHearts={userHearts} finalBlackKeysClicked={finalBlackKeysClicked} coins={coins} onContinue={(blackKeys: any, coins: any) => restartGame(blackKeys, coins)} //@ts-ignore
                               showGameOverModal={() => setShowGameOverModal(true)} />
            ) : (
                <div className="main__gameOverModal">
                    <span className={`gameOverSpan`}>Игра окончена</span>
                    <div className="statisticBlock">
                        <span>
                            Очки: {finalBlackKeysClicked}
                        </span>
                        <span>
                            Монеты: {coins}
                        </span>
                    </div>
                    <button className={`modalGameOver__replayBtn`} onClick={() => restartGame()}><img src={svgReplayIcon}
                                                                                                      alt="replay"/>
                    </button>
                    <button className={`modalGameOver__homeBtn`} onClick={() => nav(-1)}>
                        <img src={svgHomeIcon} alt="home"/>
                    </button>
                </div>
            )}
        </>
    );
};

export default GameOverModal;