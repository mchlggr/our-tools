import { render } from '@testing-library/react';

import SvgDoc from './svg-doc';

describe('DisplaySvg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgDoc />);
    expect(baseElement).toBeTruthy();
  });
});
