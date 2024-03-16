import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Colors, colorsTokensDark } from '@takumakira-individual/tk-ui-react-v2.themes.colors';
import { useThemeSwitcher, Theme } from '@takumakira-individual/tk-ui-react-v2.hooks.use-theme-switcher';
import { NavBar } from '@takumakira-individual/tk-ui-react-v2.ui.nav-bar';
import { LineChart, LineChartProps } from '@takumakira-individual/tk-ui-react-v2.ui.line-chart';
import { ApiQueryClientProvider, useApi } from '@takumakira-individual/tk-ui-react-v2.hooks.use-api';
import styles from './tk-ui-react-v2-web.module.scss';

const getPosts = (postId: number) => () => fetch(`https://jsonplaceholder.typicode.com/posts/${postId ?? ''}`).then(res => res.json())
function PostViewer() {
  const [postId, setPostId] = useState<number>(1)
  const { isLoading, data } = useApi(['post', { postId }], getPosts(postId))
  useEffect(() => { setInterval(() => setPostId(id => Math.min((id ?? 0) + 1, 10)), 10000) }, [])
  return (
    <div>
      {isLoading
        ? <span>Loading...</span>
        : <>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </>
      }
    </div>
  )
}

const getTemperature = (lat: number, lon: number, tz: string) => () => fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=${tz}&past_days=3&forecast_days=3`).then(res => res.json())
const getTokyoTemperature = getTemperature(35.6895, 139.6917, 'Asia%2FTokyo')
const getBerlinTemperature = getTemperature(52.5244, 13.4105, 'Europe%2FBerlin')
function ChartViewer() {
  const { isLoading: isLoadingTokyo, data: tokyoData } = useApi('tokyoTemperature', getTokyoTemperature)
  const { isLoading: isLoadingBerlin, data: berlinData } = useApi('berlinTemperature', getBerlinTemperature)

  const [lineChartData, setLineChartData] = useState<LineChartProps['data']>()
  useEffect(() => {
    if (!tokyoData || !berlinData) return
    setLineChartData({
      labels: tokyoData.hourly.time,
      datasets: [
        {
          label: 'Tokyo',
          data: tokyoData.hourly.temperature_2m,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointStyle: false,
        },
        {
          label: 'Berlin',
          data: berlinData.hourly.temperature_2m,
          fill: false,
          borderColor: 'rgb(192, 75, 192)',
          tension: 0.1,
          pointStyle: false,
        },
      ]
    })
  }, [tokyoData, berlinData])
  if (isLoadingTokyo || isLoadingBerlin) {
    return <span>Loading...</span>
  }
  return <LineChart data={lineChartData} />
}

export function TkUiReactV2Web() {
  const theme = useThemeSwitcher()
  return (
    <ApiQueryClientProvider>
      <Colors overrides={theme === Theme.DARK ? colorsTokensDark : undefined}>
        <div className={classNames(styles.container)}>
          <NavBar>Title</NavBar>
          <main className={classNames(styles.main)}>
            <div className={classNames(styles.content)}>
              <PostViewer />
              <ChartViewer />
            </div>
          </main>
        </div>
      </Colors>
    </ApiQueryClientProvider>
  );
}
