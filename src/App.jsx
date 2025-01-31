import { useState, useEffect } from 'react'
import './App.css'
import {Button, DotLoading} from "antd-mobile";

function App() {
    const [firstName, setFirstName] = useState('');
    const [themeParams, setThemeParams] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null)



    useEffect(()=> {
        const Telegram = window.Telegram;
    if (Telegram && Telegram.WebApp) {
        const user = Telegram.WebApp.initDataUnsafe?.user || {};
        const theme = Telegram.WebApp.themeParams;
        setFirstName(user.first_name || false);
        setThemeParams(theme);
    }}, []);

    const fetchBtc = async () => {
        setLoading('true')
        const apiUrl = "https://api.coinbase.com/v2/prices/BTC-RUB/buy";
        fetch(apiUrl)
            .then(response => {
                    if (!response.ok) {
                        throw new Error(`Ошибка: ${response.status}`);
                    }
                    return response.json();
                }
            )
            .then(json => {
                setData(json);
                setLoading('false')
                console.log(json)
            })
            .catch((err)=>{
                console.log('Ошибка:',err.message)
            });
    };



  return (
      <>
          {/*<pre>{JSON.stringify(themeParams, null, 2)}</pre>*/}
          <h1 className={'tColor'}>Привет, {firstName}</h1>
          <h2 className={'tColor'}>Курс BTC</h2>
          {data ? (
              <p className={'tColor'}>{data.data.amount} RUB</p>
          ) : (
              loading  ?  <p className={'tColor'}>Загрузка..</p> : <p className={'tColor'}>Нажмите, чтобы узнать</p>
          )}
          <Button
              style={{
                  backgroundColor: 'var(--tg-theme-button-color)',
                  color: 'var(--tg-theme-button-text-color)',
                  border: 'none'
              }}
              className={'button'}
              onClick={fetchBtc}>Узнать</Button>
      </>
  )
}

export default App
