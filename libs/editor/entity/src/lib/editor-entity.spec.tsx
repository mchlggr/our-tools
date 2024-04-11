import { render } from '@testing-library/react';

import EditorEntity from './editor-entity';

describe('EditorEntity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorEntity />);
    expect(baseElement).toBeTruthy();
  });
});
