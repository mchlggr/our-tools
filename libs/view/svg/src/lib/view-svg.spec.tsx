import { render } from '@testing-library/react';

import ViewSvg from './view-svg';

describe('ViewSvg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ViewSvg />);
    expect(baseElement).toBeTruthy();
  });
});
