import { colorsTokens, ColorsSchema } from './colors-tokens.js';
import { colorsTokensDark } from './colors-tokens-dark.js';
import { Colors } from './colors.js';

export function Example1GetStarted() {
  return (
    <Colors>
      hello world!
    </Colors>
  );
};

export function Example2UseDarkTheme() {
  return (
    <Colors overrides={colorsTokensDark}>
      hello dark world!
    </Colors>
  );
};

export function Example3ThemeUsage() {
  return (
    <Colors overrides={colorsTokensDark}>
      <div style={{ padding: 8 }}>
        theme example content
        <p style={{ border: '1px solid var(--border-color)' }}>This is bordered.</p>
      </div>
    </Colors>
  );
};

const myTokenOverrides: ColorsSchema = {
  ...colorsTokens,
  backgroundColor: '#d2d2d2',
  textColor: '#1616ab',
};

export function Example4CustomizeTheme() {
  return (
    <Colors overrides={myTokenOverrides}>
      theme example content
    </Colors>
  );
};
