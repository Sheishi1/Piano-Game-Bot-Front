import React from 'react';

// @ts-ignore
const TimeBar = ({ timer, initialTimer }) => {
    const percent = (timer / initialTimer) * 100;
    return (
        <div className="timer-bar">
            <div className="timer-bar__fill" style={{width: `${percent}%`}} />
        </div>
    );
};

export default TimeBar;