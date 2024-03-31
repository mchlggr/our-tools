import { selectingLayers } from './layer-utils';
import { WorldModel } from './world-types';

describe('selectingLayers function', () => {
  it('should filter and return only layers the user is selecting', () => {

    const testEntities = [
      { id: '1', type: "layer:test" },
      { id: '2', type: "layer:test" },
      { id: '3', type: "layer:test" },
    ];

    const selectingIds = new Set(['1', '3']);

    const worldModel: WorldModel = {
      id: '',
      committedAt: new Date(),
      tool: 0,
      selectingIds: selectingIds,
      lockingIds: new Set(),
      parkingIds: new Set(),
      erasingIds: new Set(),
      hintingIds: new Set(),
      editingId: '',
      croppingId: '',
      focusingId: '',
      facets: [],
      boundary: { min: { x: 0, y: 0 }, max: { x: 10, y: 10 } },
      perspectives: {},
      entities: testEntities,
    };

    const result = selectingLayers(worldModel);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe('1');
  });
});
