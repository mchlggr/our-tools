//TODO: to setup files
import "fake-indexeddb/auto";

import { createWorld } from './create';
import { expect } from 'vitest';
import { defaultVersion } from '@our-tools/world-shared';

describe('createWorld', () => {
  it('should create world', async () => {
    const world = await createWorld("test:123")
    expect(world.version).toEqual(defaultVersion)
    expect(true).toEqual(true)
  });

  it("changes world", async () => {
    expect(true).toEqual(true)
  })
});
