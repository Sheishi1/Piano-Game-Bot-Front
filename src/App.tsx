import React, {useEffect, useState} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";
import axios from "axios";
const {onToggleButton, tg, user} = useTelegram()

interface Data {
    id: string;
    userName: string;
}

function App() {
    const [data, setData] = useState<Data | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                tg.ready()
                const response = await axios.post(
                    'http://localhost:5000/api/user/auth',
                    {id: user?.id, userName: user?.userName}
                )
                setData(response.data)
                return response;
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, []);

    return (
    <div className="App">
        <p>{data?.id}</p>
        <Routes>
            <Route index element={ <WelcomePage /> } />
            <Route path={'playground'} element={ <PlayGroundPage /> } />
        </Routes>
    </div>
  );
}

export default App;
