import { render } from '@testing-library/react';

import SvgRectangle from './svg-rectangle';
import { renderRectangleNormal } from '@our-tools/view-example';

describe('SvgRectangle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgRectangle {...renderRectangleNormal} />);
    expect(baseElement).toBeTruthy();
  });
});
