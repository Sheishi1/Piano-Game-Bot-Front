import React, { useState, useEffect } from 'react';
import "./PlayGroundStyles.css";

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
    const [crossings, setCrossings] = useState(0); // новый счетчик пересечений

    const handleKeyClick = (color: string, keyIndex: any) => {
        if (gameOver) return;

        if (color === 'black') {
            setBlackKeysClicked(oldCount => {
                let isGreen = oldCount === 9;
                if (isGreen) {
                    setCrossings(oldCrossings => oldCrossings + 1); // увеличиваем счетчик пересечений
                    setTimer(initialTimer - crossings); // устанавливаем таймер на начальное значение минус количество пересечений
                    setGreenRowPassed(true);
                } else {
                    setKeyRows([generateRow(), ...keyRows.slice(0, -1)]);
                }
                return isGreen ? 0 : oldCount + 1;
            });
        } else if (color === 'white') {
            setGameOver(true);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(oldTimer => {
                if (oldTimer <= 0) {
                    clearInterval(interval);
                    setGameOver(true);
                    alert('Игра окончена! Вы не пересекли зеленую полосу вовремя.');
                    return 0;
                } else {
                    return oldTimer - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (gameOver) {
            setKeyRows(calculateInitialRows());
            setBlackKeysClicked(0);
            setCoins(0);
            setInitialTimer(10);
            setTimer(10);
            setGameOver(false);
        } else if (greenRowPassed) {
            setKeyRows([generateRow(), ...keyRows.slice(0, -1)]);
            setCoins(oldCoins => oldCoins + 1);
            setGreenRowPassed(false);
        } else if (blackKeysClicked === 0 && keyRows[0][0] === 'green') {
            setCoins(oldCoins => oldCoins + 1);
        }
    }, [gameOver, blackKeysClicked, greenRowPassed]);

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
            {keyRows.slice().reverse().map((row, index) => (
                row[0] === 'green' ? <GreenBar key={index} /> : <KeyRow key={index} row={row} onClick={handleKeyClick} />
            ))}
        </div>
    );
};

export default PlayGroundPage;