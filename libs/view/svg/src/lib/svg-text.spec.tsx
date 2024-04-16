import { render } from '@testing-library/react';

import SvgText from './svg-text';
import { viewTextNormal } from '@our-tools/view-example';

describe('SvgText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgText {...viewTextNormal} />);
    expect(baseElement).toBeTruthy();
  });
});
