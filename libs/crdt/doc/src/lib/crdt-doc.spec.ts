import { crdtDoc } from './crdt-doc';

describe('crdtDoc', () => {
  it('should work', () => {
    expect(crdtDoc()).toEqual('crdt-doc');
  });
});
