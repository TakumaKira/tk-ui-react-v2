import { useEffect, useState } from 'react';
import { useScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.hooks.use-scraped-trend';
import { LineChart, LineChartProps, getColor } from '@takumakira-individual/tk-ui-react-v2.ui.line-chart';

const jobTrendDataValidator = (data: any): { job_title: string, job_location: string, count: number } => {
  const { job_title: jobTitle, job_location: jobLocation, count } = data
  if (typeof jobTitle !== 'string') throw new Error('job_title must be a string')
  if (typeof jobLocation !== 'string') throw new Error('job_location must be a string')
  if (typeof count !== 'number') throw new Error('count must be a number')
  return { job_title: jobTitle, job_location: jobLocation, count }
}

export function JobTrendChart() {
  const jobTrend = useScrapedTrend('http://localhost:5000', jobTrendDataValidator)

  const [lineChartData, setLineChartData] = useState<LineChartProps['data']>()
  useEffect(() => {
    if (!jobTrend) return
    const uniqueLabels = Array.from(new Set(jobTrend.flatMap(({ results }) => results.map(({ scrape_date }) => scrape_date.toLocaleDateString()))))
    const labels = uniqueLabels.sort()
    setLineChartData({
      labels,
      datasets: jobTrend.map(({ results }, i) => ({
        label: `${results[0].job_title}/${results[0].job_location}`,
        data: results.map(({ count }) => count),
        fill: false,
        borderColor: getColor(i),
        tension: 0.1,
        pointStyle: false,
      }))
    })
  }, [jobTrend])

  if (!lineChartData) {
    return <span>Loading...</span>
  }
  return <LineChart data={lineChartData} />;
}
