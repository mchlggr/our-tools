import { render } from '@testing-library/react';

import EndpointResource from './endpoint-resource';

describe('EndpointResource', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EndpointResource />);
    expect(baseElement).toBeTruthy();
  });
});
