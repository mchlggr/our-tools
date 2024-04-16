import { render } from '@testing-library/react';

import SvgText from './svg-text';

describe('SvgText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgText />);
    expect(baseElement).toBeTruthy();
  });
});
