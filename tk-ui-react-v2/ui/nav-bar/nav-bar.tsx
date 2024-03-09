import type { ReactNode } from 'react';

export type NavBarProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function NavBar({ children }: NavBarProps) {
  return (
    <div>
      {children}
    </div>
  );
}
