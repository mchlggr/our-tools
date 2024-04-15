import { render } from '@testing-library/react';

import WindowSpace from './window-space';

describe('WindowSpace', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WindowSpace />);
    expect(baseElement).toBeTruthy();
  });
});
