import { renderHook, act } from '@testing-library/react';
import { useScrapedTrend } from './use-scraped-trend.js';

it('should increment the counter', () => {
  const { result } = renderHook(() => useScrapedTrend());
  
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
})
