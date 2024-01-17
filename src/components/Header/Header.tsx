import React from 'react';
import CloseBtn from "../ui/closeButton/closeBtn";
import {useTelegram} from "../../hooks/useTelegram";


const Header = () => {
    const {user} = useTelegram()

    return (
        <div className={`header`}>
            <img src={user?.image} alt="userImage"/>
            <span className={`userName`}>
                {user?.username}
            </span>
        </div>
    );
};

export default Header;