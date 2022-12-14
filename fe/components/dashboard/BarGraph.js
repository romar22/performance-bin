import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarGraphN({ title, previousTotal, currentTotal, selectedYear }){
	const data = {
		datasets: [
			{
				backgroundColor: '#3F51B5',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [previousTotal, currentTotal],
				label: selectedYear - 1,
				maxBarThickness: 10
			},
			{
				backgroundColor: '#9D174D',
				barPercentage: 0.5,
				barThickness: 12,
				borderRadius: 4,
				categoryPercentage: 0.5,
				data: [currentTotal],
				label: selectedYear,
				maxBarThickness: 10
			},
		],
		labels: ['', '']
	};

	const options = {
		cornerRadius: 20,
		layout: { padding: 0 },
		legend: { display: false },
		maintainAspectRatio: false,
		responsive: true,
		scale: {
		ticks: {
			precision: 0
		}
		},
		xAxes: [
		{
			ticks: {
			fontColor: 'red'
			},
			gridLines: {
			display: false,
			drawBorder: false
			}
		}
		],
		yAxes: [
		{
			ticks: {
			fontColor: 'blue',
			beginAtZero: true,
			min: 0
			},
			gridLines: {
			borderDash: [2],
			borderDashOffset: [2],
			color: 'blue',
			drawBorder: false,
			zeroLineBorderDash: [2],
			zeroLineBorderDashOffset: [2],
			zeroLineColor: 'blue'
			}
		}
		],
		tooltips: {
		backgroundColor: '#fff',
		bodyFontColor: 'blue',
		borderColor: 'red',
		borderWidth: 1,
		enabled: true,
		footerFontColor: 'green',
		intersect: false,
		mode: 'index',
		titleFontColor: 'black'
		}
	};

    return(
        <div>
			<div className="h-[300px]">
				<div>{title}</div>
				<Bar
					data={data}
					options={options}
				/>
			</div>
        </div>
    )
}