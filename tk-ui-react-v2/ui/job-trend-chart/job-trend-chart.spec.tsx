import React from 'react';
import { render } from '@testing-library/react';
import { BasicJobTrendChart } from './job-trend-chart.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicJobTrendChart />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
