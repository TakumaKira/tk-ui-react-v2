import { useState } from 'react';

/**
 * A useThemeSwitcher React hook.
 */
export function useThemeSwitcher() {
  const [count, setCount] = useState(0)
  const increment = () => setCount((c) => c + 1)

  return { 
    count, 
    increment
  };
}
