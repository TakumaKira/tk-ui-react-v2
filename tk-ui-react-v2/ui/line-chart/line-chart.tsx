import { useEffect, useRef, useState } from 'react';
import { Chart, ChartConfiguration } from 'chart.js/auto';

export type LineChartProps = {
  /**
   * sets the data.
   */
  data?: ChartConfiguration<"line", number[], string>['data'];
};

export function LineChart({ data }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chart, setChart] = useState<Chart>()
  useEffect(() => {
    if (!canvasRef.current) return
    if (chart) {
      chart.destroy()
    }
    const chartLocal = new Chart(canvasRef.current, {
      type: 'line',
      data
    })
    setChart(chartLocal)
  }, [data])
  return (
    <canvas ref={canvasRef} />
  );
}
