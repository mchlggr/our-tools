import { allSelectingLayers } from './layer-utils';
import { WorldModel } from './model-types';
import { RectangleLayer } from './layer-types';

describe('selectingLayers function', () => {
  it('should filter and return only layers the user is selecting', () => {

    const rectLayer: RectangleLayer = {
      id: '0',
      type: 'layer:rectangle',
      facets: ['fill', 'stroke'],
      x1: 0,
      y1: 0,
      z1: 0,
      x2: 0,
      y2: 0,
      z2: 0
    };


    const worldModel: WorldModel = {
      version: '',
      lastModifiedBy: '',
      lastModifiedAt: new Date,
      lastModifiedCounter: 0, // Add A.Counter
      lastModifiedIds: {},
      users: {
        'a': {
          tool: 'tool:select',
          selectingIds: {
            'entity:layer': ['1', '3']
          },
          lockingIds: {},
          parkingIds: {},
          erasingIds: {},
          hintingIds: {},
          editingIds: {},
          croppingIds: {},
          focusingIds: {}
        }
      },
      facets: {},
      // boundary: { min: { x: 0, y: 0 }, max: { x: 10, y: 10 } },
      // TODO: perspectives: {},
      entities: {
        'entity:layer': {
          '1': { ...rectLayer, id: '1' },
          '2': { ...rectLayer, id: '2' },
          '3': { ...rectLayer, id: '3' }
        },
        'entity:surface': {},
        'entity:scene': {},
        'entity:space': {}
      },
      boundary: {
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0
      },
      edges: []
    };

    // const result = selectingEntites('layers', { userId: "a"});

    const result = allSelectingLayers(worldModel);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe('1');
  });
});
