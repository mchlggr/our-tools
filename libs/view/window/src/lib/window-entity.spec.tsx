import { render } from '@testing-library/react';

import WindowEntity from './window-entity.tsx';

describe('WindowEntityTsx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WindowEntity />);
    expect(baseElement).toBeTruthy();
  });
});
