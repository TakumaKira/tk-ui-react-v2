import { render } from '@testing-library/react';
import { NavBar } from './nav-bar.js';

it('should render the correct text', () => {
  const { getByText } = render(<NavBar>Test</NavBar>);
  const rendered = getByText('Test');
  expect(rendered).toBeTruthy();
});

/**
 * Ideally, it would be better if css values were tested, but Jest is not for the purpose.
 * At least we can confirm the same functionalities are working as tried to be tested below on `Composition` section of [the component page](https://bit.cloud/takumakira-individual/tk-ui-react-v2/themes/colors).
 */

it.skip('should render in the configured height', () => {
  const { getByText } = render(<NavBar height={48}>Test</NavBar>);
  const rendered = getByText('Test');
  expect(rendered.style.height).toBe(48);
})
