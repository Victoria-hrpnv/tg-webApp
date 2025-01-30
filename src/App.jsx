import { useState, useEffect } from 'react'
import './App.css'
import {Button} from "antd-mobile";

function App() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');


    useEffect(()=> {
    if (Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe?.user || {};
        setUsername(user.username || 'Неизвестный пользователь');
        setFirstName(user.first_name || '');
        setLastName(user.last_name || '');
    }}, []);

  return (
    <>
      <Button>Привет!</Button>
        <div>ghbvt</div>
    </>
  )
}

export default App
