import React from 'react';
import { JSX } from 'react/jsx-runtime';
import "./selectModeBtn.css"

const SelectModeBtn = (props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button {...props} className={props.className} />
    );
};

export default SelectModeBtn;