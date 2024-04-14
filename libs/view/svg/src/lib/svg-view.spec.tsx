import { render } from '@testing-library/react';

import SvgView from './svg-view';

describe('SvgView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgView />);
    expect(baseElement).toBeTruthy();
  });
});
