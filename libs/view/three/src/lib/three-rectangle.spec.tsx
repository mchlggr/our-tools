import { render } from '@testing-library/react';

import ThreeRectangle from './three-rectangle';

describe('ThreeRectangle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThreeRectangle />);
    expect(baseElement).toBeTruthy();
  });
});
