import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { LineChart } from './line-chart.js';

vi.mock('chart.js/auto', async (importOriginal) => {
  const mod = await importOriginal<typeof import('chart.js/auto')>()
  return {
    ...mod,
    Chart: vi.fn(),
  }
})

it('should render the canvas', () => {
  const result = render(<LineChart data={{labels: [], datasets: []}} />);
  expect(result.baseElement.children[0].children[0].tagName).toBe('CANVAS');
});
