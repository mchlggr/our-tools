import { crdtRepo } from './crdt-repo';

describe('crdtRepo', () => {
  it('should work', () => {
    expect(crdtRepo()).toEqual('crdt-repo');
  });
});
