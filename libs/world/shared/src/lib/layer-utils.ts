// Dependencies
import { filter, groupBy, keyBy } from 'lodash';
import { Entity, EntitySelection } from './types';
import { LayerEntity } from './layer-types';
import { WorldModel } from './world-types';

// ---

const layerTagRegex = /layer:/;

const filterLayers = (entities: Entity[]): LayerEntity[] => entities.filter(({ type }) => layerTagRegex.test(type));

const selectingLayers = ({ entities, selectingIds }: WorldModel) => {
  const layers = filterLayers(entities);
  return filter(layers, ({ id }) => selectingIds.has(id));
};


// const groupLayersBySurface = (layers: LayerEntity[]) => groupBy(layers, 'groupId')

// ---

export {
  layerTagRegex,
  filterLayers,
  selectingLayers
};
