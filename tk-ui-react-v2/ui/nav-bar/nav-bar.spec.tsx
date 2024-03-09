import React from 'react';
import { render } from '@testing-library/react';
import { BasicNavBar } from './nav-bar.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicNavBar />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
