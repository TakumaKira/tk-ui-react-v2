import { useEffect, useState } from 'react';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

/**
 * A useThemeSwitcher React hook.
 */
export function useThemeSwitcher() {
  const colorScheme = matchMedia('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(colorScheme.matches ? Theme.DARK : Theme.LIGHT)

  const onChangeColorScheme = ({ matches }) => {
    if (matches) {
      setTheme(Theme.DARK)
    } else {
      setTheme(Theme.LIGHT)
    }
  }

  useEffect(() => {
    colorScheme.addEventListener('change', onChangeColorScheme)
    return () => colorScheme.removeEventListener('change', onChangeColorScheme)
  })

  return theme
}
