import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { JobTrendChart } from './job-trend-chart.js';
import { LineChart, LineChartProps, getColor } from '@takumakira-individual/tk-ui-react-v2.ui.line-chart';
import { ApiQueryClientProvider } from './index.js';
import { ScrapedTrend, useScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.hooks.use-scraped-trend';

vi.mock('@takumakira-individual/tk-ui-react-v2.hooks.use-scraped-trend', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@takumakira-individual/tk-ui-react-v2.hooks.use-scraped-trend')>()
  return {
    ...mod,
    useScrapedTrend: vi.fn(),
  }
})

vi.mock('@takumakira-individual/tk-ui-react-v2.ui.line-chart', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@takumakira-individual/tk-ui-react-v2.ui.line-chart')>()
  return {
    ...mod,
    LineChart: vi.fn(),
  }
})

it('should pass expected data to LineChart', () => {
  type JobTrendData = {
    job_title: string;
    count: number;
  }
  const validator = (data: any): JobTrendData => ({
    job_title: data.job_title,
    count: data.count
  })
  const mockJobTrend: ScrapedTrend<JobTrendData>[] = [
    ScrapedTrend.from({
      url: 'url',
      results: [
        { job_title: 'job1', count: 1, scrape_date: '2021-01-01 00:00:00' },
        { job_title: 'job1', count: 2, scrape_date: '2021-01-02 00:00:00' },
      ]
    }, validator, true),
  ]
  vi.mocked(useScrapedTrend).mockReturnValue(mockJobTrend)
  const expectedLineChartData: LineChartProps['data'] = {
    labels: [new Date('2021-01-01 00:00:00').toLocaleDateString(), new Date('2021-01-02 00:00:00').toLocaleDateString()],
    datasets: [
      {
        label: 'job1',
        data: [1, 2],
        fill: false,
        borderColor: getColor(0),
        tension: 0.1,
        pointStyle: false,
      },
    ]
  }
  const wrapper = ({ children }) => (
    <ApiQueryClientProvider>{children}</ApiQueryClientProvider>
  )
  const jobTrendDataApiEndpoint = 'url'
  render(
    <JobTrendChart
      jobTrendDataApiEndpoint={jobTrendDataApiEndpoint}
      jobTrendDataValidator={validator}
      labelGetter={data => data.job_title}
      countGetter={data => data.count}
    />
  , { wrapper });
  expect(LineChart).toHaveBeenCalledWith({ data: expectedLineChartData }, {});
});
