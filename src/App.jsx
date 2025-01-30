import { useState, useEffect } from 'react'
import './App.css'
import {Button, Avatar} from "antd-mobile";

function App() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [themeParams, setThemeParams] = useState('');
    const [avatar, setAvatar] = useState('');



    useEffect(()=> {
        const Telegram = window.Telegram;
    if (Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe?.user || {};
        const theme = Telegram.WebApp.themeParams;
        const avatarStr = Telegram.WebApp.initDataUnsafe?.photo_url;
        setUsername(user.username || 'Неизвестный пользователь');
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
        setAvatar(avatarStr);
        setThemeParams(theme);

    }}, []);

  return (
      <>
          <pre>{JSON.stringify(themeParams, null, 2)}</pre>
          <p className={'privet'}>Привет, {firstName}</p>
          <Button className={'button'} >Привет!</Button>
          <Avatar src={avatar} style={{ '--size': '150px', '--border-radius': '50%'  }} />
          <p>{avatar}</p>
      </>
  )
}

export default App
