import { ScrapedTrend } from './scraped-trend.js';

it('has a ScrapedTrend.from() method', () => {
  expect(ScrapedTrend.from).toBeTruthy();
});

it('creates new instance with ScrapedTrend.from() method', () => {
  const url = 'https://job-board.com/a-job-in-somewhere'
  const plainResults = [
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1000,
      scrape_date: '2021-01-01 00:00:00',
    },
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1001,
      scrape_date: '2021-01-02 00:00:00',
    },
  ]
  const expectedResults = [
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1000,
      scrape_date: new Date('2021-01-01 00:00:00+00:00'),
    },
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1001,
      scrape_date: new Date('2021-01-02 00:00:00+00:00'),
    },
  ]
  const expectedToObjectResults = [
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1000,
      scrape_date: '2021-01-01T00:00:00.000Z',
    },
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1001,
      scrape_date: '2021-01-02T00:00:00.000Z',
    },
  ]
  const validator = (data: any): { job_title: string, job_location: string, count: number } => {
    const { job_title: jobTitle, job_location: jobLocation, count } = data
    if (typeof jobTitle !== 'string') throw new Error('job_title must be a string')
    if (typeof jobLocation !== 'string') throw new Error('job_location must be a string')
    if (typeof count !== 'number') throw new Error('count must be a number')
    return { job_title: jobTitle, job_location: jobLocation, count }
  }
  const scrapedTrend = ScrapedTrend.from({ url, results: plainResults }, validator)
  expect(scrapedTrend.url).toBe(url)
  expect(scrapedTrend.results).toEqual(expectedResults)
  expect(scrapedTrend.toObject()).toEqual({ url, results: expectedToObjectResults })
});
