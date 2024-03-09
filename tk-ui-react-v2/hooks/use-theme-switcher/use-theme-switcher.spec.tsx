import { renderHook, act } from '@testing-library/react';
import { useThemeSwitcher } from './use-theme-switcher.js';

it('should increment the counter', () => {
  const { result } = renderHook(() => useThemeSwitcher());
  
  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
})
