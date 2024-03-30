import { setMockPrefersColorSchemeDarkMatches, mockPrefersColorSchemeDarkRemoveEventListener, setInitialPrefersColorSchemeDarkMatches } from './matchMedia.mock.js';
import { renderHook, act } from '@testing-library/react';
import { useThemeSwitcher, Theme } from './use-theme-switcher.js';

it('should return current theme', () => {
  setInitialPrefersColorSchemeDarkMatches(true)
  const { result, unmount } = renderHook(() => useThemeSwitcher(true));

  // Initially, the theme is dark in this case.
  expect(result.current.theme).toBe(Theme.DARK);
  // User switch the color scheme to light.
  act(() => setMockPrefersColorSchemeDarkMatches(false))
  expect(result.current.theme).toBe(Theme.LIGHT);
  // User switch the color scheme to dark from UI.
  act(() => result.current.setTheme(Theme.DARK))
  expect(result.current.theme).toBe(Theme.DARK);
  // User switch the color scheme back to light from UI.
  act(() => result.current.setTheme(Theme.LIGHT))
  // Then switch the color scheme to dark.
  act(() => setMockPrefersColorSchemeDarkMatches(true))
  // But the theme stays the same.
  expect(result.current.theme).toBe(Theme.LIGHT);

  unmount()
  expect(mockPrefersColorSchemeDarkRemoveEventListener).toHaveBeenCalled()
})

it('should return current theme whenever colorscheme or theme changes', () => {
  setInitialPrefersColorSchemeDarkMatches(true)
  const { result, unmount } = renderHook(() => useThemeSwitcher(false));

  // Initially, the theme is dark in this case.
  expect(result.current.theme).toBe(Theme.DARK);
  // User switch the color scheme to light.
  act(() => setMockPrefersColorSchemeDarkMatches(false))
  expect(result.current.theme).toBe(Theme.LIGHT);
  // User switch the color scheme to dark from UI.
  act(() => result.current.setTheme(Theme.DARK))
  expect(result.current.theme).toBe(Theme.DARK);
  // User switch the color scheme back to light from UI.
  act(() => result.current.setTheme(Theme.LIGHT))
  // Then switch the color scheme to dark.
  act(() => setMockPrefersColorSchemeDarkMatches(true))
  // Should follow the colorscheme change.
  expect(result.current.theme).toBe(Theme.DARK);

  unmount()
  expect(mockPrefersColorSchemeDarkRemoveEventListener).toHaveBeenCalled()
})
