import { render } from '@testing-library/react';
import { EditStage } from './edit-stage';

describe('EditStage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditStage />);
    expect(baseElement).toBeTruthy();
  });
});
