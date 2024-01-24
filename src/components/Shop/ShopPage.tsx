import React, {useEffect, useState} from 'react';
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
import axios from "axios";
import {UserData} from "../../Models/UserData";

const ShopPage = (props: {userId: number, userName: string, coins: number}) => {
    const [data, setData] = useState<UserData | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.post(
                    'https://pianobot.dutx.site/api/shop/allproducts',
                    {
                        userId: props.userId,
                    }
                )
                setData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        getProducts()
    }, [data]);

    const buyTheme = async (productId: number) => {
        try {
            const response = await axios.post(
                'https://pianobot.dutx.site/api/shop/buyproduct',
                {
                    userId: props.userId,
                    productId: productId,
                    price: props.coins
                }
            )
            setData(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    // @ts-ignore
    buyTheme()

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
                    <button>Купить</button>
                </div>
            </div>
        </>
    );
};

export default ShopPage;