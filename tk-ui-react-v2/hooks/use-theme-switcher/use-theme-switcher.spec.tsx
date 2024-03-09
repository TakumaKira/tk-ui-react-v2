import './matchMedia.mock';
import { renderHook } from '@testing-library/react';
import { useThemeSwitcher, Theme } from './use-theme-switcher.js';

it('should increment the counter', () => {
  const { result } = renderHook(() => useThemeSwitcher());

  expect(result.current).toBe(Theme.LIGHT);
})
