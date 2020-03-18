import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('contains correct page heading, the title of the app', () => {
  const { getByText } = render(<App />);
  const pageHeading = getByText(/Opening Hours/i);
  expect(pageHeading).toBeInTheDocument();
});
