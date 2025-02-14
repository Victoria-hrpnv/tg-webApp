import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale
} from "chart.js";
import { PolarArea } from 'react-chartjs-2';
import {useEffect, useState} from "react";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const DiagramOfRadii = ({theme, labels, radius, period})=>{
    const [sector, setSector] = useState(null)

    useEffect(() => {
        setSector(period/3);
    }, [period]);

    const bColor = () => radius.map((item)=>{
        if (item < sector){
            return 'rgba(255, 0, 0, 0.7)';
        }
        if (item > sector && item < sector*2 ){
            return 'rgba(255, 255, 0, 0.8)'
        }
        return 'rgba(25, 255, 25, 0.5)';
    })

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Значение',
                data: radius,
                backgroundColor: period === 0 ? 'rgba(25, 255, 25, 0.5)': bColor(),
                borderWidth: 1,
                borderColor:theme.bg_color === "#ffffff" ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)' ,
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
                max: period === 0 ? 1 : period,
                min: 0,
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    padding: 4,
                    font: {
                        size: 11
                    } ,
                    callback: function (label) {
                        const maxWidth = 10;
                        const words = label.split(' ');
                        let currentLine = '';
                        const lines = [];

                        words.forEach(word => {
                            if ((currentLine + word).length > maxWidth) {
                                lines.push(currentLine.trim());
                                currentLine = '';
                            }
                            currentLine += `${word} `;
                        });
                        if (currentLine) {
                            lines.push(currentLine.trim());
                        }
                        return lines;
                    }
                },
                ticks: {
                    display: false,
                    stepSize: period === 30 ? 5 : 1,
                },
                angleLines: {
                    display: true,
                    color: theme.bg_color === "#ffffff" ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                },
                grid: {
                    color: theme.bg_color === "#ffffff" ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)' ,
                },
            },
        },
    };


    return( <>
                <PolarArea data={data} options={options}/>
        </>
    )
}

export default DiagramOfRadii