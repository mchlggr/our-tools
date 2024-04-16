import { render } from '@testing-library/react';

import SvgHtml from './svg-html';

describe('SvgHtml', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgHtml />);
    expect(baseElement).toBeTruthy();
  });
});
