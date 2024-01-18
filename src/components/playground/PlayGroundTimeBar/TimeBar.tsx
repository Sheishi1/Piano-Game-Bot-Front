import React from 'react';
import "./TimeBar.css"

// @ts-ignore
const TimeBar = ({ timer, initialTimer }) => {
    const percentage = (timer / initialTimer) * 100;
    return (
        <div className="timer-bar">
            <div className="timer-bar-progress" style={{ width: `${percentage}%` }} />
            <span>{timer}</span>
        </div>
    );
};

export default TimeBar;