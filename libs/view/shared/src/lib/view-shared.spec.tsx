import { render } from '@testing-library/react';

import ViewShared from './view-shared';

describe('ViewShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewShared />);
    expect(baseElement).toBeTruthy();
  });
});
