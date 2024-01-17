import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {useTelegram} from "./hooks/useTelegram";
import CloseBtn from "./components/welcome/buttons/closeButton/closeBtn";

function App() {
    const {onToggleButton, tg} = useTelegram()


    useEffect(() => {
        tg.ready()
    }, []);



  return (
    <div className="App">
        <Header />
        <CloseBtn onClick={onToggleButton} className={`closeBtn`}>toggle</CloseBtn>
    </div>
  );
}

export default App;
