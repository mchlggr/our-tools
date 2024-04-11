// Dependencies
import { size, chain, filter, get, groupBy, isEmpty, keyBy, keys } from 'lodash';
import { Entity, Uuid } from './types';
import { AnyLayer, LayerEntity, RectangleLayer } from './layer-types';
import {
  WorldModel,
  AnyAwarenessIdKey,
  AnyAwarenessTypeTag,
  ModelEntities,
  AnyEntityAwarenessTypeTag,
  awareKey, emptyFacets
} from './model-types';
// import { emptyObject, isPresent, multi } from '@our-tools/extension';
// import { AnyEntitySegment, entityTag } from '@our-tools/world-shared';

// ---

// const layerTagRegex = /layer:/;

// const filterLayers = (entities: Entity[]): LayerEntity[] => entities.filter(({ type }) => layerTagRegex.test(type));

type WorldSelectorOptions = {
  // parentId?: string
  // sceneId?: string
  // surfaceId?: string
  userId?: string
  // type?: string
}

interface WorldIdSelector {
  (type: AnyAwarenessTypeTag, model: WorldModel, { userId }: WorldSelectorOptions): Uuid[];
}

interface WorldEntitySelector<T> {
  (type: AnyAwarenessTypeTag, model: WorldModel, { userId }: WorldSelectorOptions): T[];
}


//TODO: benchmark and optimze and memoize this function, it will be on the hot path
const getEngagedIds = (model: WorldModel, opts: {
  userIds: Uuid[],
  engagedKeys: AnyAwarenessIdKey[],
  entityTypes?: AnyEntityAwarenessTypeTag[],
  facetTypes?: AnyEntityAwarenessTypeTag[]
}): Uuid[] => {
  const { userIds, engagedKeys, entityTypes = [], facetTypes = [] } = opts;
  if (isEmpty(userIds) || isEmpty(engagedKeys) || (isEmpty(entityTypes) && isEmpty(facetTypes))) {
    console.warn(`Please pass a non-empty userIds array: ${userIds}`);
    return [];
  }

  return userIds.map((userId) => {
    const userSlice = model.users[userId];
    return engagedKeys.map((engagedKey) => {
      const idsByType = userSlice[engagedKey];
      const facetIds = facetTypes.map((type) => idsByType[type]);
      const entityIds = entityTypes.map((type) => idsByType[type]);
      return [...facetIds, ...entityIds];
    });
  }).flat(3);
};


// const getAwareEntities = <T>(entitiesKey: AnyAwarenessTag, idsSelector: WorldIdSelector) : WorldEntitySelector<T> => (model, { userId }): T[] => {
const getEngagedEntities = (model: WorldModel, opts: {
  userIds: Uuid[],
  engagedKeys: AnyAwarenessIdKey[],
  entityTypes: AnyEntityAwarenessTypeTag[],
}): unknown[] => {
  const {  entityTypes } = opts;
  const ids = getEngagedIds(model, opts);

  return entityTypes.map((type) => {
    const entities = model.entities[type];

    console.assert(size(entities) === size(ids), `${size(ids) - size(entities)} items are missing from entities[]` )
    return ids.map((id) => entities[id]);
  }).flat();
};

const allUserIds = (model: WorldModel): Uuid[] => keys(model.users);

// const selectingIds = (model: WorldModel, opts: {userId: Uuid}) => getAwareIds(model, 'selectingIds', opts)

const allSelectingLayers = (model: WorldModel) : LayerEntity[] => {
  const userIds = allUserIds(model);
  const layers  = getEngagedEntities(model, { userIds, engagedKeys: ['selectingIds'], entityTypes: ['entity:layer'] });
  return (layers as LayerEntity[])
};

// TODO: const groupLayersBySurface = (layers: LayerEntity[]) => groupBy(layers, 'groupId')

// const selectingIds = multi(
//   (model, type, opts) => type,
// )

// const selectingEntities =

// updateEntity('layer:rect', () => {
// })

// ---

export {
  // layerTagRegex,
  allSelectingLayers,
  // filterLayers
};
