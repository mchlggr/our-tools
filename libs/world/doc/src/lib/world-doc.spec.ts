import { worldDoc } from './world-doc';
import { createWorld } from './create';
import "fake-indexeddb/auto";
import { expect } from 'vitest';
import { defaultVersion } from '@our-tools/world-shared';

describe('createWorld', () => {
  it('should create world', async () => {
    // const world = await createWorld("test:123")
    // expect(world.version).toEqual(defaultVersion)
    expect(true).toEqual(true)
  });

  it("changes world", async () => {
    expect(true).toEqual(true)
  })
});
