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
// @ts-ignore
import { CircularProgress } from '@mui/material';

const ShopPage = (props: {userId: number, userName: string, coins: number, setTheme: Function}) => {
    const [data, setData] = useState<UserData | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<number | null>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        }

        getProducts()
    }, [props.userId]);

    const buyTheme = async (productId: number) => {
        setIsLoading(true);
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
            // @ts-ignore
            if (e.response && e.response.data) {
                // @ts-ignore
                setErrorMessage(e.response.data);
                setTimeout(() => setErrorMessage(null), 3000);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleButtonClick = (newTheme: number) => {
        setSelectedTheme(newTheme);
        props.setTheme(newTheme);
    };

    if (isLoading) {
        return <CircularProgress className={`CircularIndicator`} />;
    }


    if (errorMessage) {
        return (
            <div className={`errorMessage`}>
                {errorMessage}
            </div>
        );
    }

    return (
        <>
            <ShopHeader coins={props.coins} />
            <div className={`main__ShopPageBlock`}>
                <div className="shopItem">
                    <span>1 оформление</span>
                    <img src={sevenShopItem} alt="firstItem"/>
                    <button onClick={() => handleButtonClick(1)}>{selectedTheme === 1 ? 'Выбрано' : 'Выбрать'}</button>
                </div>

                {   //@ts-ignore
                    data && data?.userPurchases!.includes(2) ? (
                        <div className="shopItem purchased">
                            <span>2 оформление (уже куплено)</span>
                            <img src={firstShopItem} alt="firstItem"/>
                            <button onClick={() => handleButtonClick(2)}>{selectedTheme === 2 ? 'Выбрано' : 'Выбрать'}</button>
                        </div>
                    ) : (
                        <div className="shopItem">
                            <span>2 оформление, 500$</span>
                            <img src={firstShopItem} alt="firstItem"/>
                            <button onClick={() => buyTheme(2)}>Купить</button>
                        </div>
                    )}
                {   //@ts-ignore
                    data && data?.userPurchases!.includes(3) ? (
                        <div className="shopItem purchased">
                            <span>3 оформление (уже куплено)</span>
                            <img src={secondShopItem} alt="firstItem"/>
                            <button onClick={() => handleButtonClick(3)}>{selectedTheme === 3 ? 'Выбрано' : 'Выбрать'}</button>
                        </div>
                    ) : (
                        <div className="shopItem">
                            <span>3 оформление, 1000$</span>
                            <img src={secondShopItem} alt="firstItem"/>
                            <button onClick={() => buyTheme(3)}>Купить</button>
                        </div>
                    )}
                {   //@ts-ignore
                    data && data?.userPurchases!.includes(4) ? (
                        <div className="shopItem purchased">
                            <span>4 оформление (уже куплено)</span>
                            <img src={thridShopItem} alt="firstItem"/>
                            <button onClick={() => handleButtonClick(4)}>{selectedTheme === 4 ? 'Выбрано' : 'Выбрать'}</button>
                        </div>
                    ) : (
                        <div className="shopItem">
                            <span>4 оформление, 1000$</span>
                            <img src={thridShopItem} alt="firstItem"/>
                            <button onClick={() => buyTheme(4)}>Купить</button>
                        </div>
                    )}
            </div>
        </>
    );
};

export default ShopPage;