import { describe } from 'vitest';
import { isStrokeFacet } from './facet';

describe('Runtime Facet Type Checkers', () => {
  test('isStrokeFacet returns true when type is a strokeType', () => {
    expect(isStrokeFacet({ type: 'stroke:none' })).toBe(true);
  });

  test('isStrokeFacet returns false when type is not a strokeType', () => {
    expect(isStrokeFacet({ type: 'invalidStrokeType' })).toBe(false);
  });
});

