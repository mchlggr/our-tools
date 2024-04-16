import { render } from '@testing-library/react';

import SvgPencil from './svg-pencil';
import { viewPencilNormal } from '@our-tools/view-example';

describe('SvgPencil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgPencil {...viewPencilNormal} />);
    expect(baseElement).toBeTruthy();
  });
});
