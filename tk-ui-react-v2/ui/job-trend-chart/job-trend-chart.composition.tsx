import { MockProvider } from '@acme/acme.testing.mock-provider';
import { JobTrendChart } from './job-trend-chart.js';
import { ApiQueryClientProvider } from '@takumakira-individual/tk-ui-react-v2.hooks.use-api';

export const BasicJobTrendChart = () => {
  return (
    <MockProvider>
      <ApiQueryClientProvider>
        <JobTrendChart />
      </ApiQueryClientProvider>
    </MockProvider>
  );
}
