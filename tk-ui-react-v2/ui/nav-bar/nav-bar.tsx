import classNames from 'classnames';
import styles from './nav-bar.module.scss';

export type NavBarProps = {
  /**
   * sets the title.
   */
  children?: string;
  height?: number;
  titleStyles?: CSSModuleClasses['string'];
};

export function NavBar({ children, height = 64, titleStyles = styles.titleDefault }: NavBarProps) {
  return (
    <nav className={classNames(styles.navBar)} style={{ height }}>
      <header className={classNames(titleStyles)}>
        {children}
      </header>
    </nav>
  );
}
