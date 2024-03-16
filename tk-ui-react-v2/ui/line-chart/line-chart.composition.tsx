import { LineChart, LineChartProps } from './line-chart.js';

export const BasicLineChart = () => {
  const data: LineChartProps['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'My Second Dataset',
        data: [56, 95, 8, 18, 65, 55, 4],
        fill: false,
        borderColor: 'rgb(192, 75, 192)',
        tension: 0.1
      },
    ],
  }
  return (
    <LineChart data={data} />
  );
}
