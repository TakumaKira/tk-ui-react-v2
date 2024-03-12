import { useEffect, useState } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

/**
 * A useThemeSwitcher React hook.
 */
export function useThemeSwitcher() {
  const [colorScheme, setColorScheme] = useState<MediaQueryList>()
  const setColorSchemeWhenAvailable = () => {
    setColorScheme(window.matchMedia('(prefers-color-scheme: dark)'))
  }
  useEffect(setColorSchemeWhenAvailable, [])

  const [theme, setTheme] = useState<Theme>()
  const getInitialTheme = () => {
    if (theme) return
    if (!colorScheme) return
    setTheme(colorScheme.matches ? Theme.DARK : Theme.LIGHT)
  }
  useEffect(getInitialTheme, [colorScheme])

  const onChangeColorScheme = ({ matches }) => {
    if (matches) {
      setTheme(Theme.DARK)
    } else {
      setTheme(Theme.LIGHT)
    }
  }
  useEffect(() => {
    if (!colorScheme) return
    colorScheme.removeEventListener('change', onChangeColorScheme)
    colorScheme.addEventListener('change', onChangeColorScheme)
    return () => colorScheme.removeEventListener('change', onChangeColorScheme)
  }, [colorScheme])

  return theme
}
