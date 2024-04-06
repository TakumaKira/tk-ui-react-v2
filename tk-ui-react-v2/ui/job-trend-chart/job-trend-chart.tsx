import { useEffect, useState } from 'react';
import { useScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.hooks.use-scraped-trend';
import { LineChart, LineChartProps, getColor } from '@takumakira-individual/tk-ui-react-v2.ui.line-chart';
import { Result } from '@takumakira-individual/tk-ui-react-v2.entities.scraped-trend';

export type JobTrendChartProps<JobTrendData extends Record<string, any>> = {
  /**
   * sets the scraped trend result Api endpoint.
   */
  jobTrendDataApiEndpoint: string;
  /**
   * sets the validator to make sure each result has defined properties.
   * @param data the pre-validated result
   * @returns the validated result
   */
  jobTrendDataValidator: (data: any) => JobTrendData;
  /**
   * sets the label getter to get the label from the result.
   * @param data the validated result
   * @returns the label to be displayed on the chart
   */
  labelGetter: (data: Result<JobTrendData>) => string;
  /**
   * sets the count getter to get the count from the result.
   * @param data the validated result
   * @returns the count
   */
  countGetter: (data: Result<JobTrendData>) => number;
};


export function JobTrendChart<JobTrendData extends Record<string, any>>({ jobTrendDataApiEndpoint, jobTrendDataValidator, labelGetter, countGetter }: JobTrendChartProps<JobTrendData>) {
  const jobTrend = useScrapedTrend(jobTrendDataApiEndpoint, jobTrendDataValidator)

  const [lineChartData, setLineChartData] = useState<LineChartProps['data']>()
  useEffect(() => {
    if (!jobTrend) return
    const uniqueLabels = Array.from(new Set(jobTrend.flatMap(({ results }) => results.map(({ scrape_date }) => scrape_date.toLocaleDateString()))))
    const labels = uniqueLabels.toSorted()
    setLineChartData({
      labels,
      datasets: jobTrend
        .filter(({ results }) => results.length > 0)
        .map(({ results }, i) => ({
          label: labelGetter(results[0]),
          data: results.map(countGetter),
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
