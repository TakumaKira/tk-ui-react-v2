import { useEffect, useState, useCallback } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

/**
 * A useThemeSwitcher React hook.
 */
export function useThemeSwitcher(ignoreColorSchemeChangeAfterSetThemeEverCalled = true) {
  const [colorScheme, setColorScheme] = useState<MediaQueryList>()
  const setColorSchemeWhenAvailable = () => {
    setColorScheme(window.matchMedia('(prefers-color-scheme: dark)'))
  }
  useEffect(setColorSchemeWhenAvailable, [])

  const [themePrivate, setThemePrivate] = useState<Theme>()
  const getInitialTheme = () => {
    if (themePrivate) return
    if (!colorScheme) return
    setThemePrivate(colorScheme.matches ? Theme.DARK : Theme.LIGHT)
  }
  useEffect(getInitialTheme, [colorScheme])

  const [ignoreColorSchemeChange, setIgnoreColorSchemeChange] = useState(false)

  const onChangeColorScheme = useCallback(({ matches }) => {
    if (ignoreColorSchemeChange) {
      return
    }
    if (matches) {
      setThemePrivate(Theme.DARK)
    } else {
      setThemePrivate(Theme.LIGHT)
    }
  }, [ignoreColorSchemeChange, setThemePrivate])
  useEffect(() => {
    if (!colorScheme) return
    colorScheme.removeEventListener('change', onChangeColorScheme)
    colorScheme.addEventListener('change', onChangeColorScheme)
    return () => colorScheme.removeEventListener('change', onChangeColorScheme)
  }, [colorScheme, onChangeColorScheme])

  const setTheme = (newTheme: Theme) => {
    if (ignoreColorSchemeChangeAfterSetThemeEverCalled) {
      setIgnoreColorSchemeChange(true)
    }
    setThemePrivate(newTheme)
  }

  return { theme: themePrivate, setTheme }
}
