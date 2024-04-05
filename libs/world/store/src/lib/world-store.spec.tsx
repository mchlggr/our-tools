import { render } from '@testing-library/react';

import WorldStore from './world-store';

describe('WorldStore', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorldStore />);
    expect(baseElement).toBeTruthy();
  });
});
