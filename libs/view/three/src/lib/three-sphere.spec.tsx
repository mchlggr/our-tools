import { render } from '@testing-library/react';

import ThreeSphere from './three-sphere';

describe('ThreeSphere', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThreeSphere />);
    expect(baseElement).toBeTruthy();
  });
});
