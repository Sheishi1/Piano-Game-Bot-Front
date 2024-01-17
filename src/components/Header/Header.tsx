import React from 'react';
import CloseBtn from "../welcome/buttons/closeButton/closeBtn";
import {useTelegram} from "../../hooks/useTelegram";
// @ts-ignore
const tg = window.Telegram.WebApp


const Header = () => {
    const {user, onClose} = useTelegram()

    return (
        <div className={`header`}>
            <CloseBtn onClick={onClose} className={`closeBtn`}>Закрыть</CloseBtn>
            <span className={`userName`}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;