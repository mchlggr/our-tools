import { render } from '@testing-library/react';

import ViewWindow from './view-window';

describe('ViewWindow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewWindow />);
    expect(baseElement).toBeTruthy();
  });
});
