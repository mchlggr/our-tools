import { render } from '@testing-library/react';

import SvgPencil from './svg-pencil';

describe('SvgPencil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgPencil />);
    expect(baseElement).toBeTruthy();
  });
});
