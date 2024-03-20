import { PlainScrapedTrend } from './scraped-trend.js';

export function mockPlainScrapedTrend(): PlainScrapedTrend<{ job_title: string, job_location: string, count: number }>[] {
  return [
    {
      url: 'https://job-posting-site.com/frontend-developer-san-francisco',
      results: [
        {
          job_title: 'Frontend Developer',
          job_location: 'San Francisco, CA',
          count: 10,
          scrape_date: '2021-01-01 00:00:00',
        },
        {
          job_title: 'Frontend Developer',
          job_location: 'San Francisco, CA',
          count: 11,
          scrape_date: '2021-01-02 00:00:00',
        },
        {
          job_title: 'Frontend Developer',
          job_location: 'San Francisco, CA',
          count: 9,
          scrape_date: '2021-01-03 00:00:00',
        },
        {
          job_title: 'Frontend Developer',
          job_location: 'San Francisco, CA',
          count: 12,
          scrape_date: '2021-01-04 00:00:00',
        },
      ]
    },
    {
      url: 'https://job-posting-site.com/backend-developer-san-francisco',
      results: [
        {
          job_title: 'Backend Developer',
          job_location: 'San Francisco, CA',
          count: 11,
          scrape_date: '2021-01-01 00:00:00',
        },
        {
          job_title: 'Backend Developer',
          job_location: 'San Francisco, CA',
          count: 9,
          scrape_date: '2021-01-02 00:00:00',
        },
        {
          job_title: 'Backend Developer',
          job_location: 'San Francisco, CA',
          count: 12,
          scrape_date: '2021-01-03 00:00:00',
        },
        {
          job_title: 'Backend Developer',
          job_location: 'San Francisco, CA',
          count: 10,
          scrape_date: '2021-01-04 00:00:00',
        },
      ]
    },
  ];
}
