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
    const [loading, setLoading] = useState(true); // Добавьте это состояние

    useEffect(() => {
        const fetchData = async () => {
            try {
                tg.ready()
                console.log(user.userName, user.id)

                const response = axios.post('http://78.155.197.115:5000/api/user/auth', {
                    userId: user?.userId,
                    userName: user?.userName
                })
                    .then(function (response) {
                        setData(response.data)
                    })
                    .catch(function (error) {
                        setData(error)
                    });
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [data, tg, user]);

    if (loading) {
        return <div>Loading...</div>; // Отображайте индикатор загрузки, пока данные загружаются
    }

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
