import { render } from '@testing-library/react';

import WindowSurface from './window-surface.tsx';

describe('WindowSurfaceTsx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WindowSurface />);
    expect(baseElement).toBeTruthy();
  });
});
