import { useState, useEffect } from 'react'
import './App.css'
import {Button} from "antd-mobile";
import DiagramOfRadii from "./components/DiagramOfRadii/DiagramOfRadii.jsx";




function App() {
    const [firstName, setFirstName] = useState('');
    const [themeParams, setThemeParams] = useState('');
    const [radiusArray, setRadiusArray] = useState(
        ['1', '0', '1', '0', '1', '0', '1',]
    );
    const [labelsArray, setLabelsArray] = useState(
        ["radius1","radius2","radius3","radius4","radius5","radius6","radius7"]
    );
    const [period, setPeriod] = useState(1);

    useEffect(()=> {
        const Telegram = window.Telegram;
        if (Telegram && Telegram.WebApp) {
            const user = Telegram.WebApp.initDataUnsafe?.user || {};
            setThemeParams(Telegram.WebApp.themeParams)
            setFirstName(user.first_name || false);
            }

        }, []);

    // Функция для загрузки данных с сервера
    // const fetchData = async (period) => {
    //     const id = userId || 143937122; // Если userId не определено, используем 143937122
    //     const url = `http://127.0.0.1:8080/${id}/${period}`;
    //
    //     try {
    //         // Ваш асинхронный код, например, запрос на сервер
    //         const response = await fetch(url, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             mode: 'cors',
    //         });
    //         // Проверка успешности ответа
    //         if (!response.ok) {
    //             throw new Error(`Ошибка при получении данных: ${response.status}`);
    //         }
    //         const data = await response.json();
    //         if (data.message) {
    //             alert(`Ошибка: ${data.message}`);
    //             return;
    //         }
    //         const labels = Object.keys(data)
    //         setLabelsArray(labels);
    //         const radius = Object.values(data)
    //         setRadiusArray(radius)
    //
    //     } catch (error) {
    //         console.error('Произошла ошибка:', error.message);
    //     }
    // };

    //Временные данные
        const togglePeriod = (period) => {
            if (period === 1) {
                setPeriod(1)
                setLabelsArray(
                    ["radius1","radius2","radius3","radius4","radius5","radius6","radius7"]
                );
                setRadiusArray(
            ['1', '0', '1', '0', '1', '0', '1',]
                )
                } else {
                setPeriod(7)
                setLabelsArray(
                ["radius1","radius2","radius3","radius4","radius5","radius6","radius7"]
            )
                setRadiusArray(
                    ['1', '5', '3', '6', '2', '3', '6',]
                )}
        }

  return (
      <>
          <h1 className={'tColor'}>Привет, {firstName}</h1>
          <div className={'div'}>
              <DiagramOfRadii theme={themeParams} period = {period} labels = {labelsArray} radius = {radiusArray}></DiagramOfRadii>
          </div>
          <h2 className={'tColor'}>Выбери период</h2>
          <Button
              style={{
                  backgroundColor: 'var(--tg-theme-button-color)',
                  color: 'var(--tg-theme-button-text-color)',
                  border: 'none',
                  marginRight: '20px'
              }}
              className={'button'}
              onClick={() => togglePeriod(1)}>День</Button>
          <Button
              style={{
                  backgroundColor: 'var(--tg-theme-button-color)',
                  color: 'var(--tg-theme-button-text-color)',
                  border: 'none'
              }}
              className={'button'}
              onClick={() => togglePeriod(30)}>Неделя</Button>
          {/*<pre>{JSON.stringify(themeParams, null, 2)}</pre>*/}
      </>
  )
}

export default App
