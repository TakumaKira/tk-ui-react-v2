import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Colors, colorsTokensDark } from '@takumakira-individual/tk-ui-react-v2.themes.colors';
import { useThemeSwitcher, Theme } from '@takumakira-individual/tk-ui-react-v2.hooks.use-theme-switcher';
import { NavBar } from '@takumakira-individual/tk-ui-react-v2.ui.nav-bar';
import { LineChart, LineChartProps } from '@takumakira-individual/tk-ui-react-v2.ui.line-chart';
import styles from './tk-ui-react-v2-web.module.scss';

export function TkUiReactV2Web() {
  const theme = useThemeSwitcher()
  const [lineChartData, setLineChartData] = useState<LineChartProps['data']>()
  useEffect(() => {
    setLineChartData({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'My Second Dataset',
          data: [56, 95, 8, 18, 65, 55, 4],
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1
        },
      ]
    })
  }, [])
  return (
    <Colors overrides={theme === Theme.DARK ? colorsTokensDark : undefined}>
      <div className={classNames(styles.container)}>
        <NavBar>Title</NavBar>
        <main className={classNames(styles.main)}>
          <div className={classNames(styles.content)}>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem expedita, ducimus, repellat obcaecati similique tempore dolores inventore asperiores cumque temporibus praesentium maxime ipsum cum ut rem sint at doloribus ad.</p>
            <LineChart data={lineChartData} />
          </div>
        </main>
      </div>
    </Colors>
  );
}
