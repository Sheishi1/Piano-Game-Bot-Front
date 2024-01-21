import React from 'react';
import "./selectModeBlocks.css"
import SelectModeBtn from "../selectModeBtn/SelectModeBtn";
// @ts-ignore
import playSvgIcon from '../../../assets/play-1003-svgrepo-com.svg'
// @ts-ignore
import cupSvgIcon from '../../../assets/cup-1-svgrepo-com (1).svg'
// @ts-ignore
import shopSvgIcon from '../../../assets/shop-svgrepo-com.svg'
import { Link } from 'react-router-dom';

const Selectmode = () => {
    return (
        <div className={`main__selectModeBlock`}>
            <div className="selectModeBtnsBlock">
                <span>Piano-Game</span>
                <Link to="/playground"> {/* Переместите Link сюда */}
                    <SelectModeBtn className={`selectModeBtn`}>
                        <img src={playSvgIcon} alt="play" style={{marginRight: 10}}/>
                        Играть
                    </SelectModeBtn>
                </Link>
                <SelectModeBtn className={`selectModeBtn`}>
                    <img src={cupSvgIcon} alt="cup" style={{marginRight: 10}}/>
                    Рейтинг
                </SelectModeBtn>
                <SelectModeBtn className={`selectModeBtn`}>
                    <img src={shopSvgIcon} alt="shop" style={{marginRight: 10}}/>
                    Магазин
                </SelectModeBtn>
            </div>
        </div>
    );
};

export default Selectmode;