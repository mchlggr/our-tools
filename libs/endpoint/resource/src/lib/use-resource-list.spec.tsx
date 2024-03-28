import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useResourceList from './resource-list';

describe('useResourceList', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useResourceList());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
