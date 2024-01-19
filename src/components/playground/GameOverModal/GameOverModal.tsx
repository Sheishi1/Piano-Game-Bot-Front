import React, {useEffect} from 'react';
import "./GameOverModal.css";
// @ts-ignore
import svgHomeIcon from '../../../assets/house-svgrepo-com (1).svg'
// @ts-ignore
import svgReplayIcon from '../../../assets/multimedia-refresh-replay-video-icon-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";
import axios from "axios";

// @ts-ignore
const GameOverModal = ({userId, finalBlackKeysClicked, restartGame, coins}) => {
    const nav = useNavigate();

    useEffect(() => {
        const fetchUpdateUserData = async () => {
            try {
                const response = await axios.post(
                    'http://78.155.197.115:5000/api/user/info/update',
                    {
                        userId: userId,
                        coins: coins,
                        points: finalBlackKeysClicked
                    }
                )
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchUpdateUserData()
    }, []);

    return (
        <>
            <div className="modal-overlay"/>
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
                <button className={`modalGameOver__replayBtn`} onClick={restartGame}><img src={svgReplayIcon}
                                                                                          alt="replay"/></button>
                <button className={`modalGameOver__homeBtn`} onClick={() => nav(-1)}>
                    <img src={svgHomeIcon} alt="home"/>
                </button>
            </div>
        </>
    );
};

export default GameOverModal;