import { selectingLayers } from './layer-utils';
import { WorldModel } from './model-types';

describe('selectingLayers function', () => {
  it('should filter and return only layers the user is selecting', () => {

    const worldModel: WorldModel = {
      id: '',
      committedAt: new Date(),
      tool: 'tool:select',
      selectingIds: { 'a': ['1', '3'] },
      lockingIds: { },
      parkingIds: { },
      erasingIds: { },
      hintingIds: { },
      editingId: '',
      croppingId: '',
      focusingId: '',
      facets: {},
      // boundary: { min: { x: 0, y: 0 }, max: { x: 10, y: 10 } },
      perspectives: {},
      entities: {
        layers: {
          '1': { id: '1', type: 'layer:line' },
          '2': { id: '2', type: 'layer:line' },
          '3': { id: '3', type: 'layer:line' }
        }
      }
    };

    const result = selectingLayers(worldModel, { userId: "a"});

    expect(result.length).toBe(2);
    expect(result[0].id).toBe('1');
  });
});
