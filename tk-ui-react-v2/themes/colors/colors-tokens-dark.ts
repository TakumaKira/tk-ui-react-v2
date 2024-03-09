import { ColorsSchema } from "./colors-tokens.js";

/**
 * Colors tokens.
 * Include all tokens in this object.
 */
export const colorsTokensDark: ColorsSchema = {
  /**
   * background color. use for primary surfaces across your design.
   */
  backgroundColor: '#222222',

  /**
   * color for general purpose text color. expected to mainly apply
   * on `backgroundColor`
   */
  textColor: 'white',

  /**
   * primary brand color. used for primary call to actions.
   * such as buttons, links, etc.
   */
  primaryColor: 'white',

  /**
   * color to use for borders.
   */
  borderColor: '#121212',

  /**
   * color for secondary surfaces on the screen such 
   * as cards or content outlines.
   */
  surfaceColor: '#000000',
};
