import classNames from 'classnames';
import styles from './nav-bar.module.scss';

export type NavBarProps = {
  /**
   * sets the title.
   */
  children?: string;
  height?: number;
  /**
   * sets the property of the object imported from *.module.scss.
   * @example titleStyles={styles.title}
   */
  titleStyles?: string;
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
