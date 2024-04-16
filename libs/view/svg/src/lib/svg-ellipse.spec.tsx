import { render } from '@testing-library/react';

import SvgEllipse from './svg-ellipse';

describe('SvgEllipse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgEllipse />);
    expect(baseElement).toBeTruthy();
  });
});
