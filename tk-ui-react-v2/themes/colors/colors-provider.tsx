import { createTheme } from '@teambit/base-react.themes.theme-provider';
import { ColorsSchema, colorsTokens } from './colors-tokens.js';

/**
 * creating and declaring the colors theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const ColorsProvider = createTheme<ColorsSchema>({
  theme: colorsTokens,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = ColorsProvider;
