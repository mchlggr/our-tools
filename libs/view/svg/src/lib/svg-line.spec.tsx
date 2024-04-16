import { render } from '@testing-library/react';

import SvgLine from './svg-line';
import { viewLineNormal } from '@our-tools/view-example';

describe('SvgLine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgLine {...viewLineNormal} />);
    expect(baseElement).toBeTruthy();
  });
});
