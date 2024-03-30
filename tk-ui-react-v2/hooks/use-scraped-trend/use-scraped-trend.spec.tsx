import { renderHook } from '@testing-library/react';
import { vi } from 'vitest'
import { useScrapedTrend } from './use-scraped-trend.js';
import { PlainScrapedTrend, ScrapedTrend } from '@takumakira-individual/tk-ui-react-v2.entities.scraped-trend';
import { useApi } from '@takumakira-individual/tk-ui-react-v2.hooks.use-api';

vi.mock('@takumakira-individual/tk-ui-react-v2.hooks.use-api', async importOriginal => {
  return {
    ...await importOriginal<typeof import('@takumakira-individual/tk-ui-react-v2.hooks.use-api')>(),
    useApi: vi.fn()
  }
})

const validator = (data: any): { job_title: string, job_location: string, count: number } => {
  if (typeof data?.job_title !== 'string') throw new Error('job_title must be a string')
  if (typeof data?.job_location !== 'string') throw new Error('job_location must be a string')
  if (typeof data?.count !== 'number') throw new Error('count must be a number')
  return { job_title: data.job_title, job_location: data.job_location, count: data.count }
}

it('should return the expected value', () => {
  const mockApiResult: PlainScrapedTrend<{ job_title: string, job_location: string, count: number }>[] = [
    {
      url: 'https://job-board.com/a-job-in-somewhere',
      results: [
        {
          job_title: 'a job',
          job_location: 'somewhere',
          count: 1000,
          scrape_date: '2021-01-01 00:00:00',
        }
      ]
    },
  ]
  const expectedScrapedTrend: ScrapedTrend<{ job_title: string, job_location: string, count: number }>[] = [
    new ScrapedTrend(
      'https://job-board.com/a-job-in-somewhere',
      [
        {
          job_title: 'a job',
          job_location: 'somewhere',
          count: 1000,
          scrape_date: new Date('2021-01-01 00:00:00+00:00'),
        }
      ]
    ),
  ]
  vi.mocked(useApi).mockReturnValue({ isLoading: false, isError: false, apiError: null, data: mockApiResult })
  const { result } = renderHook(() => useScrapedTrend('https://my-api.com', validator));
  expect(result.current).toEqual(expectedScrapedTrend);
})

it('should return null when useApi gets an error', () => {
  const mockConsoleError = vi.spyOn(console, 'error')
  mockConsoleError.mockImplementation(() => undefined)
  vi.mocked(useApi).mockReturnValue({ isLoading: false, isError: true, apiError: undefined, data: undefined })
  const { result } = renderHook(() => useScrapedTrend('https://my-api.com', validator));
  expect(result.current).toEqual(null);
  expect(mockConsoleError).not.toHaveBeenCalled()
})

it('should return undefined when loading', () => {
  const mockConsoleError = vi.spyOn(console, 'error')
  mockConsoleError.mockImplementation(() => undefined)
  vi.mocked(useApi).mockReturnValue({ isLoading: true, isError: false, apiError: undefined, data: undefined })
  const { result } = renderHook(() => useScrapedTrend('https://my-api.com', validator));
  expect(result.current).toEqual(undefined);
  expect(mockConsoleError).not.toHaveBeenCalled()
})

it('should return null with console error when useApi returns invalid data', () => {
  const mockConsoleError = vi.spyOn(console, 'error')
  mockConsoleError.mockImplementation(() => undefined)
  vi.mocked(useApi).mockReturnValue({ isLoading: false, isError: false, apiError: undefined, data: 'invalid data' })
  const { result } = renderHook(() => useScrapedTrend('https://my-api.com', validator));
  expect(result.current).toEqual(null);
  expect(mockConsoleError).toHaveBeenCalledWith(new Error('Got the result of useApi successfully but it is something unexpected.'))
})
