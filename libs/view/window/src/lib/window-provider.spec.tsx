import { render } from '@testing-library/react';

import WindowProvider from './window-provider.tsx';

describe('WindowProviderTsx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WindowProvider />);
    expect(baseElement).toBeTruthy();
  });
});
