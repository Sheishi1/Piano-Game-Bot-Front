import React, {useEffect, useState} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";
import axios from "axios";
const {onToggleButton, tg, user} = useTelegram()

interface Data {
    userId: number | null;
    userName: string | null;
    coins: number | null,
    points: number | null,
}

function App() {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                tg.ready()
                console.log(user.userName, user.id)
                const response = await axios.post(
                    'http://localhost:5000/api/user/auth',
                    {userId: user?.id, userName: user?.userName}
                )
                setData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, []);

    return (

    <div className="App">
        <Routes>
            <Route index element={ <WelcomePage userName={data?.userName!} // @ts-ignore
                                                coins={data?.coins!} points={data?.points!} /> } />
            <Route path={'playground'} element={ <PlayGroundPage /> } />
        </Routes>
    </div>
  );
}

export default App;
