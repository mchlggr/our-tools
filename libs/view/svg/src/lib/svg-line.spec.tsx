import { render } from '@testing-library/react';

import SvgLine from './svg-line';

describe('SvgLine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgLine />);
    expect(baseElement).toBeTruthy();
  });
});
