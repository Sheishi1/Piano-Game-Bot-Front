import React from 'react';
import { JSX } from 'react/jsx-runtime';
import "./playBtn.css"

const PlayBtn = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={`button ` + props.className} />
    );
};

export default PlayBtn;