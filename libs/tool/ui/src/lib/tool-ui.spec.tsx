import { render } from '@testing-library/react';

import ToolUi from './tool-ui';

describe('ToolUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToolUi />);
    expect(baseElement).toBeTruthy();
  });
});
