// Dependencies
import { filter, groupBy, keyBy } from 'lodash';
import { Entity, EntitySelection } from './types';
import { LayerEntity } from './layer-types';
import { WorldModel } from './model-types';

// ---

const layerTagRegex = /layer:/;

const filterLayers = (entities: Entity[]): LayerEntity[] => entities.filter(({ type }) => layerTagRegex.test(type));

const selectingLayers = ({ entities: { layers }, selectingIds }: WorldModel) => {
  // const layers = filterLayers(layers);
  return filter(layers, ({ id }) => selectingIds["user:213321"].includes(id));
};


// const groupLayersBySurface = (layers: LayerEntity[]) => groupBy(layers, 'groupId')

// ---

export {
  layerTagRegex,
  filterLayers,
  selectingLayers
};
