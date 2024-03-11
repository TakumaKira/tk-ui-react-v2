import React from 'react';
import { render } from '@testing-library/react';
import { BasicLineChart } from './line-chart.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicLineChart />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
