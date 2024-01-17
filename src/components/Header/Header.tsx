import React from 'react';
import CloseBtn from "../welcome/buttons/closeButton/closeBtn";
// @ts-ignore
const tg = window.Telegram.WebApp


const Header = () => {
    const onClose = () => {
        tg.close()
    }

    return (
        <div className={`header`}>
            <CloseBtn onClick={onClose}>Закрыть</CloseBtn>
            <span className={`userName`}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </div>
    );
};

export default Header;