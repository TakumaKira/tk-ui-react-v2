import { vi } from 'vitest';
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
    {
      job_title: 'a job',
      count: 1002,
      scrape_date: '2021-01-03 00:00:00',
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
    if (typeof data?.job_title !== 'string') throw new Error('job_title must be a string')
    if (typeof data?.job_location !== 'string') throw new Error('job_location must be a string')
    if (typeof data?.count !== 'number') throw new Error('count must be a number')
    return { job_title: data.job_title, job_location: data.job_location, count: data.count }
  }
  const scrapedTrend = ScrapedTrend.from({ url, results: plainResults }, validator)
  expect(scrapedTrend.url).toBe(url)
  expect(scrapedTrend.results).toEqual(expectedResults)
  expect(scrapedTrend.toObject()).toEqual({ url, results: expectedToObjectResults })
});

it('shows understandable error with showValidationErrors flag is on when data is invalid', () => {
  const url = 'https://job-board.com/a-job-in-somewhere'
  const plainResults = [
    {
      job_title: 'a job',
      job_location: 'somewhere',
      count: 1000,
    },
    {
      job_title: 'a job',
      job_location: 'somewhere',
      scrape_date: '2021-01-02 00:00:00',
    },
    {
      job_title: 'a job',
      count: 1002,
      scrape_date: '2021-01-03 00:00:00',
    },
  ]
  const validator = (data: any): { job_title: string, job_location: string, count: number } => {
    if (typeof data?.job_title !== 'string') throw new Error('job_title must be a string')
    if (typeof data?.job_location !== 'string') throw new Error('job_location must be a string')
    if (typeof data?.count !== 'number') throw new Error('count must be a number')
    return { job_title: data.job_title, job_location: data.job_location, count: data.count }
  }
  const mockConsoleError = vi.spyOn(console, 'error')
  mockConsoleError.mockImplementation(() => undefined)
  ScrapedTrend.from({ url, results: plainResults }, validator, true)
  expect(mockConsoleError).toHaveBeenCalledWith(new Error('The result has no scrape_date property'), '\n', plainResults[0], '\n')
  expect(mockConsoleError).toHaveBeenCalledWith(new Error('The result has invalid data'), '\n', plainResults[1], '\n', new Error('count must be a number'), '\n')
  expect(mockConsoleError).toHaveBeenCalledWith(new Error('The result has invalid data'), '\n', plainResults[2], '\n', new Error('job_location must be a string'), '\n')
})
