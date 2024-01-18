import React, { useState, useEffect } from 'react';
import "./PlayGroundStyles.css";
import GameOverModal from "../GameOverModal/GameOverModal";

// @ts-ignore
const Key = ({ color, onClick }) => {
    return (
        <button className={`key ${color}`} onClick={onClick} />
    );
};

const GreenBar = () => {
    return (
        <div className="green-bar" />
    );
};

// @ts-ignore
const KeyRow = ({ row, onClick }) => {
    return (
        <div className="key-row">
            {row.map((color: any, index: React.Key | null | undefined) => (
                <Key key={index} color={color} onClick={() => onClick(color, index)} />
            ))}
        </div>
    );
};

const generateRow = (isGreen = false) => {
    if (isGreen) {
        return ['green'];
    }

    let row = new Array(4).fill('white');
    let blackKeyIndex = Math.floor(Math.random() * 4);
    row[blackKeyIndex] = 'black';
    return row;
};

const calculateInitialRows = () => {
    const screenHeight = window.innerHeight;
    const keyHeight = 200;
    const numRows = Math.ceil(screenHeight / keyHeight);
    return Array.from({ length: numRows }, generateRow);
};

const PlayGroundPage = () => {
    const [keyRows, setKeyRows] = useState(calculateInitialRows());
    const [blackKeysClicked, setBlackKeysClicked] = useState(0);
    const [coins, setCoins] = useState(0);
    const [initialTimer, setInitialTimer] = useState(10);
    const [timer, setTimer] = useState(initialTimer);
    const [gameOver, setGameOver] = useState(false);
    const [greenRowPassed, setGreenRowPassed] = useState(false);
    const [crossings, setCrossings] = useState(0);
    const [showModal, setShowModal] = useState(false);
    let [finalBlackKeysClicked, setFinalBlackKeysClicked] = useState(0);

    const handleKeyClick = (color: string, keyIndex: any) => {
        if (gameOver) return;

        if (color === 'black') {
            setBlackKeysClicked(oldCount => {
                let isGreen = oldCount === 9;
                if (isGreen) {
                    setCrossings(oldCrossings => {
                        let newCrossings = oldCrossings + 1;
                        setTimer(initialTimer - newCrossings);
                        setCoins(oldCoins => oldCoins + 1); // Add this line
                        return newCrossings;
                    });
                    setGreenRowPassed(true);
                } else {
                    setKeyRows([generateRow(), ...keyRows.slice(0, -1)]);
                }
                return isGreen ? 0 : oldCount + 1;
            });
            // @ts-ignore
            setFinalBlackKeysClicked(finalBlackKeysClicked += 1);
        } else if (color === 'white') {
            setGameOver(true);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (showModal) {
                clearInterval(interval);
            } else {
                setTimer(oldTimer => {
                    if (oldTimer <= 0) {
                        clearInterval(interval);
                        setGameOver(true);
                        setShowModal(true);
                        return 0;
                    } else {
                        return oldTimer - 1;
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, showModal]);

    useEffect(() => {
        if (gameOver) {
            setKeyRows(calculateInitialRows());
            setBlackKeysClicked(0);
            setInitialTimer(10);
            setTimer(10);
            setCrossings(0);
            setShowModal(true);
        } else if (greenRowPassed) {
            // ...
        } else if (blackKeysClicked === 0 && keyRows[0][0] === 'green') {
            // ...
        }
    }, [gameOver, blackKeysClicked, greenRowPassed]);

    const restartGame = () => {
        setCoins(0);
        setFinalBlackKeysClicked(0);
        setShowModal(false);
        setGameOver(false)
    };

    const GreenBar = () => {
        return (
            <div className="green-bar" />
        );
    };

    // @ts-ignore
    const PianoHeader = ({ coins, timer }) => {
        return (
            <div className="pianoHeader">
                <div className="coin-counter">Coins: {coins}</div>
                <div className="timer">Time: {timer}</div>
            </div>
        );
    };

    return (
        <div className="main__playgroundBlock">
            <PianoHeader coins={coins} timer={timer} />
            {showModal && <GameOverModal restartGame={restartGame} finalBlackKeysClicked={finalBlackKeysClicked} coins={coins} />}
            {keyRows.slice().reverse().map((row, index) => (
                row[0] === 'green' ? <GreenBar key={index} /> : <KeyRow key={index} row={row} onClick={handleKeyClick} />
            ))}
        </div>
    );
};

export default PlayGroundPage;