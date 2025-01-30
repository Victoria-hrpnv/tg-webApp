import { useState, useEffect } from 'react'
import './App.css'
import {Button} from "antd-mobile";

function App() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [themeParams, setthemeParams] = useState('');


    useEffect(()=> {
    if (Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe?.user || {};
        setUsername(user.username || 'Неизвестный пользователь');
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
        const theme = Telegram.WebApp.themeParams;
        setthemeParams(theme)
    }}, []);

  return (
      <>
          <pre>{JSON.stringify(themeParams, null, 2)}</pre>
          <p className={'privet'}>Привет, {firstName}</p>
          <Button>Привет!</Button>
      </>
  )
}

export default App
