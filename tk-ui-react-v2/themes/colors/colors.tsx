import { ReactNode } from 'react';
import classNames from 'classnames';
import { ColorsProvider } from './colors-provider.js';
import styles from './colors.module.scss';
import { ColorsSchema } from './colors-tokens.js';

export type ColorsProps = {
  /**
   * a root ReactNode for the component tree 
   * applied with the theme.
   */
  children?: ReactNode;
  /**
   * inject a class name to override to the theme.
   * this allows people to affect your theme. remove to avoid.
   */
  className?: string;
  overrides?: ColorsSchema;
};

/**
 * a theme for the Acme organization.
 * it provides tokens, fonts and general styling for all components.
 */
export function Colors({ children, className, ...rest }: ColorsProps) {
  return (
    <ColorsProvider.ThemeProvider
      {...rest}
      className={classNames(styles.colors, className)}
    >
      {children}
    </ColorsProvider.ThemeProvider>
  );
}
