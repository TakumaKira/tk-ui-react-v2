import React from 'react';
import { render } from '@testing-library/react';
import { BasicColors } from './colors.composition.js';

it('renders with the correct text', () => {
  const { getByText } = render(<BasicColors />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
