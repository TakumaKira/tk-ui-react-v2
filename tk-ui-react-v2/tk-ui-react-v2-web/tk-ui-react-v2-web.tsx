import classNames from 'classnames';
import { Colors, colorsTokensDark } from '@takumakira-individual/tk-ui-react-v2.themes.colors';
import { useThemeSwitcher, Theme } from '@takumakira-individual/tk-ui-react-v2.hooks.use-theme-switcher';
// import { NavBar } from '@takumakira-individual/tk-ui-react-v2.ui.nav-bar';
import styles from './tk-ui-react-v2-web.module.scss';

export function TkUiReactV2Web() {
  const theme = useThemeSwitcher()

  return (
    <Colors overrides={theme === Theme.DARK ? colorsTokensDark : undefined}>
      <div className={classNames(styles.container)}>
        {/* <NavBar>Title</NavBar> */}
        <main className={classNames(styles.main)}>
          <div className={classNames(styles.content)}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem expedita, ducimus, repellat obcaecati similique tempore dolores inventore asperiores cumque temporibus praesentium maxime ipsum cum ut rem sint at doloribus ad.</p>
          </div>
        </main>
      </div>
    </Colors>
  );
}
