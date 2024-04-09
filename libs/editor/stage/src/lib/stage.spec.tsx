import { render } from '@testing-library/react';

import Stage from './stage';

describe('Stage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Stage />);
    expect(baseElement).toBeTruthy();
  });
});
