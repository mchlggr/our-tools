import { render } from '@testing-library/react';

import EditPointerUi from './edit-pointer-ui';

describe('EditPointerUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditPointerUi />);
    expect(baseElement).toBeTruthy();
  });
});
