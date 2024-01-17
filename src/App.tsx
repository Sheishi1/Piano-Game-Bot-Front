import React, {useEffect} from 'react';
import './App.css';
// @ts-ignore
const tg = window.Telegram.WebApp

function App() {
    useEffect(() => {
        tg.ready()
    }, []);



  return (
    <div className="App">
    </div>
  );
}

export default App;
