// Dependencies
import { filter, groupBy, isEmpty, keyBy, keys } from 'lodash';
import { Entity, EntitySelection, Uuid } from './types';
import { AnyLayer, LayerEntity, RectangleLayer } from './layer-types';
import { WorldModel, IdRegistryKeys, EntityRegistryKeys, ModelEntities } from './model-types';
import { isPresent } from '@our-tools/extension'

// ---

const layerTagRegex = /layer:/;

const filterLayers = (entities: Entity[]): LayerEntity[] => entities.filter(({ type }) => layerTagRegex.test(type));

type WorldSelectorOptions = {
  // parentId?: string
  // sceneId?: string
  // surfaceId?: string
  userId?: string
  type?: string
}

interface WorldIdSelector {
 (model: WorldModel, { userId }: WorldSelectorOptions): Uuid[]
}

interface WorldEntitySelector<T> {
 (model: WorldModel, { userId }: WorldSelectorOptions): T[]
}

const registeredIds = (registryKey: IdRegistryKeys): WorldIdSelector => (model, { userId })  => {
  const ids = model[registryKey]
  switch (true) {
    case isEmpty(ids): {
      return [];
    }
    case isEmpty(userId): {
      const userIds = keys(ids)
      return userIds.map((id) => ids[id]).flat();
    }
    default: {
      return userId ? ids[userId] : []
    }
  }
}

const registeredEntities = <T>(entitiesKey: EntityRegistryKeys, idsSelector: WorldIdSelector) : WorldEntitySelector<T> => (model, { userId }): T[] => {
  const layers = model.entities[entitiesKey] as ModelEntities<T>;
  const ids: Uuid[] = idsSelector(model, { userId })
  return ids.map((id) => layers[id])
};

const selectingIds = registeredIds('selectingIds')
const selectingLayers = registeredEntities('layers', selectingIds)

// TODO: const groupLayersBySurface = (layers: LayerEntity[]) => groupBy(layers, 'groupId')

// ---
export {
  layerTagRegex,
  selectingLayers,
  filterLayers,
};
