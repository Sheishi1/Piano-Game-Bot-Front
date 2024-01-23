import React, {useEffect, useState} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";
import axios from "axios";

interface Data {
    userId: number | 0;
    userName: string | "user";
    coins: number | 0,
    points: number | 0,
}

function App() {
    const {tg, user} = useTelegram()
    const [data, setData] = useState<Data | null>(null);

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
            <Route index element={ <WelcomePage userName={data?.userName!} coins={data?.coins!} points={data?.points!} /> } />
            <Route path={'playground'} element={ <PlayGroundPage userId={data?.userId!} /> } />
        </Routes>
    </div>
  );
}

export default App;
