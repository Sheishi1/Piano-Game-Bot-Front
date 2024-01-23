import React, {useState, useEffect, useCallback, useMemo} from 'react';
import "./PlayGroundStyles.css";
import GameOverModal from "../GameOverModal/GameOverModal";
import TimeBar from "../PlayGroundTimeBar/TimeBar";
import { notes } from '../../../assets/PianoNoteSounds/notes';

const generateRow = (isGreen = false) => {
    if (isGreen) {
        return [{ color: 'green', pressed: false }];
    }

    let row = new Array(4).fill({ color: 'white', pressed: false });
    let blackKeyIndex = Math.floor(Math.random() * 4);
    row[blackKeyIndex] = { color: 'black', pressed: false };
    return row;
};

const calculateInitialRows = () => {
    const screenHeight = window.innerHeight;
    const keyHeight = 200;
    const numRows = Math.ceil(screenHeight / keyHeight);
    return [...Array.from({ length: numRows - 1 }, generateRow), new Array(4).fill('grey')];
};

// @ts-ignore
const Key = React.memo(({ color, onClick, pressed }) => {
    const buttonColor = pressed ? 'grey' : color;
    return (
        <button className={`key ${buttonColor}`} onClick={onClick} />
    );
});

// @ts-ignore
const KeyRow = React.memo(({ row, onClick, rowIndex }) => {
    return (
        <div className="key-row">
            {row.map((key: { color: any; pressed: any; }, index: React.Key | null | undefined) => (
                <Key key={index} //@ts-ignore
                     color={key.color} onClick={() => onClick(key.color, index, rowIndex)} pressed={key.pressed} />
            ))}
        </div>
    );
});

const GreenBar = () => <div className="green-bar" />;


const PlayGroundPage = (props: {userId: number | null}) => {
    const [gameStarted, setGameStarted] = useState(false);
    const [keyRows, setKeyRows] = useState(calculateInitialRows());
    const [blackKeysClicked, setBlackKeysClicked] = useState(0);
    const [coins, setCoins] = useState(0);
    const [initialTimer, setInitialTimer] = useState(20);
    const [timer, setTimer] = useState(initialTimer);
    const [gameOver, setGameOver] = useState(false);
    const [greenRowPassed, setGreenRowPassed] = useState(false);
    const [crossings, setCrossings] = useState(0);
    const [showModal, setShowModal] = useState(false);
    let [finalBlackKeysClicked, setFinalBlackKeysClicked] = useState(0);

    const playSound = () => {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const sound = new Audio(note);
        sound.play().then(r => r);
    };


    const handleKeyClick = useCallback((color: string, keyIndex: string | number, rowIndex: string | number) => {
        if (gameOver) return;

        if (color === 'black') {
            if (!gameStarted) {
                setGameStarted(true);
            }
            playSound()

            setBlackKeysClicked(oldCount => {
                let isGreen = oldCount === 9;
                if (isGreen) {
                    setCrossings(oldCrossings => {
                        let newCrossings = oldCrossings + 1;
                        setTimer(initialTimer - newCrossings);
                        setCoins(oldCoins => oldCoins + 1);
                        return newCrossings;
                    });
                    setGreenRowPassed(true);
                    setKeyRows(oldRows => {
                        const newRows = [...oldRows];
                        // @ts-ignore
                        newRows[rowIndex][keyIndex].pressed = true;
                        return [generateRow(), generateRow(), ...newRows.slice(0, -1)];
                    });
                } else {
                    setKeyRows(oldRows => {
                        const newRows = [...oldRows];
                        // @ts-ignore
                        newRows[rowIndex][keyIndex].pressed = true;
                        return [generateRow(), ...newRows.slice(0, -1)];
                    });
                }
                return isGreen ? 0 : oldCount + 1;
            });
            // @ts-ignore
            setFinalBlackKeysClicked(finalBlackKeysClicked += 1);
        } else if (color === 'white') {
            setGameOver(true);
        }
    }, [gameStarted, gameOver, timer, showModal]);


    useEffect(() => {
        if (gameStarted && !gameOver) {
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
                            return oldTimer - 0.5;
                        }
                    });
                }
            }, 500);

            return () => clearInterval(interval);
        }
    }, [gameStarted, gameOver, timer, showModal]);

    useEffect(() => {
        if (gameOver) {
            setKeyRows(calculateInitialRows());
            setBlackKeysClicked(0);
            setInitialTimer(20);
            setTimer(20);
            setCrossings(0);
            setGameStarted(false);
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
        setGameOver(false);
        setKeyRows(calculateInitialRows()); // reset keyRows state
    };

    const keyRowsReversed = useMemo(() => keyRows.slice().reverse(), [keyRows]);

    return (
        <div className="main__playgroundBlock">
            <TimeBar timer={timer} initialTimer={initialTimer} />
            <span className={'main__pointsCounter'}>{finalBlackKeysClicked}</span>
            {showModal && <GameOverModal userId={props.userId} restartGame={restartGame} finalBlackKeysClicked={finalBlackKeysClicked} coins={coins} />}
            {keyRowsReversed.map((row, index) => (
                row[0].color === 'green' ? <GreenBar key={index} /> : <KeyRow key={index} //@ts-ignore
                                                                              row={row} onClick={handleKeyClick} rowIndex={keyRows.length - index - 1} />
            ))}
        </div>
    );
};

export default React.memo(PlayGroundPage);