import { render } from '@testing-library/react';

import SvgEllipse from './svg-ellipse';
import { viewEllipseNormal } from '@our-tools/view-example';

describe('SvgEllipse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgEllipse {...viewEllipseNormal} />);
    expect(baseElement).toBeTruthy();
  });
});
