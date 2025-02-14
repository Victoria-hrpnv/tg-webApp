import {useState, useEffect} from 'react'
import {Button, Checkbox, Popup, Space, Tabs, Toast} from "antd-mobile";
import DiagramOfRadii from "./components/DiagramOfRadii/DiagramOfRadii.jsx";

function App() {
    const [themeParams, setThemeParams] = useState('');
    const [radiusArray, setRadiusArray] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [labelsArray, setLabelsArray] = useState(["Утренняя настройка", "Планирование", "Прогулка", "Активный спорт", "Навыки, деньги, статус", "Творчество", "Урок благодарности"]);
    const [period, setPeriod] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const Telegram = window.Telegram;
        if (Telegram && Telegram.WebApp) {
            // const user = Telegram.WebApp.initDataUnsafe?.user || {};
            setThemeParams(Telegram.WebApp.themeParams)
        }
        fetchData(0)
    }, []);

    const fetchData = async (period) => {
        const id = 143937122; // Если userId не определено, используем 143937122
        const url = `http://192.168.0.16:8080/${id}/${period}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });
            if (!response.ok) {
                throw new Error(`Ошибка при получении данных: ${response.status}`);
            }
            const data = await response.json();
            if (data.message) {
                alert(`Ошибка: ${data.message}`);
                return;
            }
            const labels = Object.keys(data)
            setLabelsArray(labels);
            const radius = Object.values(data)
            setRadiusArray(radius)
        } catch (error) {
            console.error('Произошла ошибка:', error.message);
        }
    };

    const sendData = async (index) => {
        const id = 143937122;
        const url = `http://192.168.0.16:8080/toggle-status`;
        const radius = labelsArray[index];
        // console.log(JSON.stringify({radius, userId: id} ))
        try {
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({radius, userId: id} ),
                })
            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const result = await response.json();
            console.log("Успешно:", result);
        }
        catch (error) {
            console.error("Ошибка запроса:", error);
        }
    }

    const toggleCheckbox = (index) => {
        setRadiusArray((prev) =>
            prev.map((item, i) => (i === index ? (item === 0 ? 1 : 0) : item))
        );
    };

    return (
        <>
            <Tabs onChange={(key) => {
                const period = parseInt(key, 10);
                setPeriod(period);
                fetchData(period);
            }}>
                <Tabs.Tab title='Сегодня' key={0}/>
                <Tabs.Tab title='Неделя' key={7}/>
                <Tabs.Tab title='Месяц' key={30}/>
            </Tabs>

            <div className={'div'}>
                <DiagramOfRadii theme={themeParams} period={period}
                                labels={labelsArray}
                                radius={radiusArray}></DiagramOfRadii>
            </div>

            {period === 0 &&
                <div className={'popUp__wrapper'}>
                    <Space align='center'>
                        <Button className={'button popUp__button'}
                                onClick={() => {
                                    setVisible(true)}}>
                            Закрыть радиус
                        </Button>
                    </Space>

                    <Popup
                           visible={visible}
                           onMaskClick={() => {
                               setVisible(false)

                           }}
                           showCloseButton
                           onClose={() => {
                               setVisible(false)
                              }}>
                        <div className={'checkListContainer'}>
                            <Space direction="vertical" block>
                                {labelsArray.map((label, index) => (
                                    <Checkbox
                                        className={'checkbox'}
                                        key={index}
                                        checked={radiusArray[index] === 1}
                                        onClick={() => {
                                            toggleCheckbox(index);
                                            sendData(index);
                                            Toast.show({
                                                content: 'Сохранено',
                                                position: "top",
                                                duration: 700,
                                            })}}>
                                        {label}
                                    </Checkbox>
                                ))}
                            </Space>
                        </div>
                    </Popup>
                </div>
            }
        </>
    )
}

export default App
