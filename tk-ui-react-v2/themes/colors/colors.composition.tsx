import { Colors } from './colors.js';

export const BasicColors = () => {
  return <Colors>hello world!</Colors>;
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
