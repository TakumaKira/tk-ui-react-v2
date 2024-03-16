import { renderHook, act } from '@testing-library/react';
import { useApi } from './use-api.js';

it('should increment the counter', () => {
  const { result } = renderHook(() => useApi());
  
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
})
