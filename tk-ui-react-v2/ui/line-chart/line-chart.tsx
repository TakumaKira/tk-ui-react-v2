import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';

export type LineChartProps = {
  /**
   * sets the data.
   */
  data?: ChartConfiguration<"line", number[], string>['data'];
};

export function LineChart({ data }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart>()
  useEffect(() => {
    if (!canvasRef.current) return
    if (chartRef.current) {
      chartRef.current.destroy()
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data
    })
  }, [data])
  return (
    <canvas ref={canvasRef} />
  );
}
