import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale
} from "chart.js";
import { PolarArea } from 'react-chartjs-2';
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);




const DiagramOfRadii = ({theme, labels, radius, period})=>{

    const data = {
        labels: labels, // Подписи сегментов
        datasets: [
            {
                label: 'My Dataset',
                data: radius, // Данные
                backgroundColor: [ // Цвета сегментов
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 71, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderWidth: 0,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            r: {
                max: period,
                min: 0,
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                        size: 16
                    }
                },
                ticks: {
                    display: false,
                    stepSize: 1,

                },
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                grid: {
                    color: theme.bg_color === "#ffffff" ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' ,
                },

            },
        },
    };

    return( <>
            <div className={'div'}>
                <PolarArea data={data} options={options}/>
            </div>
        </>
    )
}

export default DiagramOfRadii