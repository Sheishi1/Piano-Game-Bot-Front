import React, {useEffect, useState} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";
import axios from "axios";

interface Data {
    userId: number | null;
    userName: string | null;
    coins: number | null,
    points: number | null,
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
                    {userId: user?.id, userName: user?.userName}
                )
                setData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [data]);

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
