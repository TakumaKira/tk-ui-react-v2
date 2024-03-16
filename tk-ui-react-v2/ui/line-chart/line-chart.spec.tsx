import React from 'react';
import { render } from '@testing-library/react';
import { BasicLineChart } from './line-chart.composition.js';

it('should render the canvas', () => {
  const result = render(<BasicLineChart />);
  expect(result.baseElement.children[0].children[0].tagName).toBe('CANVAS');
});
