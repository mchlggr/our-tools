import { render } from '@testing-library/react';

import SvgRectangle from './svg-rectangle';

describe('SvgRectangle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgRectangle />);
    expect(baseElement).toBeTruthy();
  });
});
