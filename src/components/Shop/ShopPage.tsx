import React from 'react';
import "./Shop.css";
import ShopHeader from "./ShopHeader";
// @ts-ignore
import firstShopItem from '../../assets/ShopItems/Frame 3.png'
// @ts-ignore
import secondShopItem from '../../assets/ShopItems/Frame 4.png'
// @ts-ignore
import thridShopItem from '../../assets/ShopItems/Frame 6 (1).png'
// @ts-ignore
import sevenShopItem from '../../assets/ShopItems/Frame 7.png'

const ShopPage = (props: {userId: number, coins: number, points: number}) => {
        const handleBuy = (itemId: number, userId: number) => {
            fetch('https://pianobot.dutx.site/api/shop/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId })
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
        }

    return (
        <>
            <ShopHeader coins={props.coins} />
            <div className={`main__ShopPageBlock`}>
                <div className="shopItem">
                    <span>1 оформление</span>
                    <img src={sevenShopItem} alt="firstItem"/>
                    <button>Купить</button>
                </div>
                <div className="shopItem">
                    <span>2 оформление</span>
                    <img src={firstShopItem} alt="firstItem"/>
                    <button>Купить</button>
                </div>
                <div className="shopItem">
                    <span>3 оформление</span>
                    <img src={secondShopItem} alt="firstItem"/>
                    <button>Купить</button>
                </div>
                <div className="shopItem">
                    <span>4 оформление</span>
                    <img src={thridShopItem} alt="firstItem"/>
                    <button>Купитnь</button>
                </div>
            </div>
        </>
    );
};

export default ShopPage;