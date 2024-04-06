import { render } from '@testing-library/react';
import { Colors } from './colors.js';

it('renders with the correct content', () => {
  const TestComponent = () => <Colors>Test</Colors>
  const { getByText } = render(<TestComponent />);
  const rendered = getByText('Test');
  expect(rendered).toBeTruthy();
});

/**
 * Ideally, it would be better if css values were tested, but Jest is not for the purpose.
 * At least we can confirm the same functionalities are working as tried to be tested below on `Composition` section of [the component page](https://bit.cloud/takumakira-individual/tk-ui-react-v2/themes/colors).
 */

it.skip('should fill itself with background color configured in tokens', async () => {
  const TestComponent = () => <Colors data-testid="test1">Test</Colors>
  const { findByTestId } = render(<TestComponent />);
  const rendered = await findByTestId('test1')
  const computedProperty = window.getComputedStyle(rendered)
  expect(computedProperty.backgroundColor).toBe('rgba(245, 245, 245, 1)')
})

it.skip('should pass color property configured in tokens to any descendants', () => {

})

it.skip('should make css variables available to any descendants', () => {

})
