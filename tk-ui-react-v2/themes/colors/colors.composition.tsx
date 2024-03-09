import { colorsTokensDark } from './colors-tokens-dark.js';
import { Colors } from './colors.js';

export const BasicColors = () => {
  return <Colors overrides={undefined}>hello world!</Colors>;
};

export const BasicColorsDark = () => {
  return <Colors overrides={colorsTokensDark}>hello dark world!</Colors>;
};

export const ThemeUsage = () => {
  return (
    <Colors>
      <div style={{ backgroundColor: 'var(--background-color)' }}>
        theme example content
      </div>
    </Colors>
  );
};        
