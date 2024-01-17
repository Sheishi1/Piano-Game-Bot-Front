import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import PlayGroundPage from "./components/playground/PlayGroundPage";
import WelcomePage from "./components/welcome/welcomePage/WelcomePage";

function App() {
    const {onToggleButton, tg} = useTelegram()


    useEffect(() => {
        tg.ready()
    }, []);



  return (
    <div className="App">
        <Header />
        <Routes>
            <Route index element={ <WelcomePage /> } />
            <Route path={'playground'} element={ <PlayGroundPage /> } />
        </Routes>
    </div>
  );
}

export default App;
