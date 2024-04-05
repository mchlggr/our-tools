import { render } from '@testing-library/react';

import WorldDoc from './world-doc';

describe('WorldDoc', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorldDoc />);
    expect(baseElement).toBeTruthy();
  });
});
