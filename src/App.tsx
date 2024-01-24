import React, {useEffect, useState} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";
import axios from "axios";
import {UserData} from "./Models/UserData";
import RatingPage from "./components/Rating/RatingPage";
import ShopPage from "./components/Shop/ShopPage";

function App() {
    const {tg, user} = useTelegram()
    const [data, setData] = useState<UserData | null>(null);
    const [theme, setTheme] = useState(1);

    useEffect(() => {
        tg.ready()
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://pianobot.dutx.site/api/user/auth',
                    {userId: user?.id, userName: user?.username}
                )
                setData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [data, tg, user]);



    return (
    <div className="App">
        <Routes>
            <Route index element={ <WelcomePage userName={user?.username} coins={data?.coins!} points={data?.points!} /> } />
            <Route path={'playground'} element={ <PlayGroundPage userHearts={data?.hearts!} chosenThemeNumber={theme} userId={data?.userId!} /> } />
            <Route path={'rating'} element={ <RatingPage userId={data?.userId!} userName={data?.userName!} /> } />
            <Route path={'shop'} element={ <ShopPage userId={data?.userId!} userName={data?.userName!} coins={data?.coins!} //@ts-ignore
                                                     setTheme={setTheme} /> } />
        </Routes>
    </div>
  );
}

export default App;
