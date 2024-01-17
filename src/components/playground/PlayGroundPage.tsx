import React, { useState } from 'react';
import "./PlayGroundStyles.css";

// Компонент для клавиши
// @ts-ignore
const Key = ({ color, onClick }) => {
    return (
        <button className={`key ${color}`} onClick={onClick} />
    );
};

// Компонент для строки клавиш
// @ts-ignore
const KeyRow = ({ row, onClick }) => {
    return (
        <div className="key-row">
            {row.map((color: any, index: React.Key | null | undefined) => (
                <Key key={index} color={color} onClick={() => onClick(color)} />
            ))}
        </div>
    );
};

// Функция для генерации строки с клавишами
const generateRow = () => {
    let row = ['white', 'white', 'white', 'white'];
    let numBlacks = 0;
    while (numBlacks < 2) {
        let index = Math.floor(Math.random() * 4);
        if (row[index] === 'white') {
            row[index] = 'black';
            numBlacks++;
        }
    }
    return row;
};

const PlayGroundPage = () => {
    const [keyRows, setKeyRows] = useState([generateRow()]);

    const handleKeyClick = (color: string) => {
        if (color === 'black') {
            setKeyRows([generateRow(), ...keyRows]);
        } else {
            // Тут можно определить логику проигрыша, например алерт и сброс состояния.
            alert('You clicked on a white key! Game over!');
            setKeyRows([generateRow()]); // Рестарт игры с новой строки
        }
    };

    return (
        <div className="main__playgroundBlock">
            {keyRows.map((row, index) => (
                <KeyRow key={index} row={row} onClick={handleKeyClick} />
            ))}
        </div>
    );
};

export default PlayGroundPage;