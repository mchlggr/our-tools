import { render } from '@testing-library/react';

import WindowScene from './window-scene';

describe('WindowScene', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WindowScene />);
    expect(baseElement).toBeTruthy();
  });
});
