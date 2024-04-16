import { render } from '@testing-library/react';

import ViewThree from './view-three';

describe('ViewThree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewThree />);
    expect(baseElement).toBeTruthy();
  });
});
