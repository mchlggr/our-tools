import { Boundary, Uuid } from './types';
import { Point2D } from './types';
import { UnknownToolTag } from './unknown-types';
import { AnySurface } from './surface-types';
import { AnySpace } from './space-types';
import { AnyScene } from './scene-types';
import { AnyFacet, AnyFacetSegment } from './facet-types';
import { AnyLayer } from './layer-types';
import { FacetReference } from './world-types';
import { AnyEntitySegment } from './entity-types';
import { includes, keys, values } from 'lodash';


type ModelEntities<EntityType> = {
  [entityId: string]: EntityType
}

type ModelFacets<FacetType> = {
  [facetSegment: string]: {
    [entityOrTokenId: string]: FacetType | FacetReference
  }
};

type EdgeEnd = 'none' | 'arrow' | 'reverse-arrow'

type EdgeConnection = {
  // is the entity/node id where the connection ends.
  entityId: Uuid,
  degrees: 8n,
  // The shape/style of the endpoint at the edge end.
  end?: EdgeEnd
  data: UserData
}

type UserData = {
  [key: string]: number | string | boolean
}

type ModelEdge = {
  type: string
  id: Uuid,
  from: EdgeConnection | Point2D,
  to: EdgeConnection | Point2D,
  label?: string,
  // Facets color
  data: UserData
}

const emptyEntities = Object.freeze({
  layers: {},
  surfaces: {},
  scenes: {},
  spaces: {}
});

const emptyFacets: ModelFacets<AnyFacet> = Object.freeze({
  'fill': {},
  'path': {},
  'font-style': {},
  'font-unit': {},
  'font-size': {},
  'stroke': {}
});


type AnyAwarenessIdKey = 'selectingIds' | 'lockingIds'| 'parkingIds' | 'erasingIds' | 'hintingIds'
type AnyEntityAwarenessTypeTag = AnyEntitySegment
type AnyFacetAwarenessTypeTag = AnyFacetSegment

type AnyAwarenessTypeTag =  AnyEntityAwarenessTypeTag | AnyFacetAwarenessTypeTag

// const awareKey : Record<string, AnyAwarenessIdKey> = {
const engagedKey = {
  selecting: 'selectingIds',
  locking: 'lockingIds',
  parking: 'parkingIds',
  erasing: 'erasingIds',
  hinting: 'hintingIds'
}

const isEngagedKey = (key: string) => values(engagedKey).includes(key)

const engagingKeys = keys(engagedKey)

type AwareIdsByType = {
  [entityOrFacetType: string]: Uuid[]
}

type AwareAgent = {
    // tool: UnknownToolTag,
    state: UnknownToolTag
    pointers: { } // settings
    tool: { } // settings
    // TODO: pointers: {}
    selectingIds: AwareIdsByType // Gets applied from awareness on commit
    // Consider moving down to space, scene or surface
    lockingIds: AwareIdsByType // Gets applied from awareness on commit
    parkingIds: AwareIdsByType // Gets applied from awareness on commit
    erasingIds: AwareIdsByType // Gets applied from awareness on commit
    hintingIds: AwareIdsByType // Gets applied from awareness on commit
    //
    editingIds: AwareIdsByType
    croppingIds: AwareIdsByType
    focusingIds: AwareIdsByType
}


type WorldModel = {
  version: string
  state: string //TODO: state types
  // id: Uuid
  lastModifiedBy?: Uuid,
  lastModifiedAt: Date,
  lastModifiedCounter: unknown, // Add A.Counter
  lastModifiedIds?: AwareIdsByType, // Add A.Counter
  users: { //TODO: rename to 'agent'
    [userId: string]: AwareAgent
  }
  // Used for history snapshot previews
  boundary: Boundary // Move to outside of document as a cached document meta-data
  // Segmented Facet Arrays
  facets: ModelFacets<AnyFacet>
  // Segmented Entity Arrays
  : Uuid[]
  entities: {
    'entity:layer': ModelEntities<AnyLayer>
    'entity:surface': ModelEntities<AnySurface>
    'entity:scene': ModelEntities<AnyScene>
    'entity:space': ModelEntities<AnySpace>
    //TODO: 'entity:block': {} // Portable Text Block
    //TODO: 'entity:model': {} // 3D equivalent of a layer
  },
  // Connections between entities
  // edges: Record<string, ModelEdge>
  data: UserData
}

// const alternativeEntityMapping = {
//   "123": {
//     childrenIds: ["1"],
//     childrenOrder: ["1"]
//   }
// }

type ModelTransform = (model: WorldModel) => WorldModel
type ModelTransaction = (model: WorldModel) => void

export {
  AnyAwarenessIdKey,
  AnyAwarenessTypeTag,
  AnyFacetAwarenessTypeTag,
  AnyEntityAwarenessTypeTag,
  WorldModel,
  ModelTransform,
  ModelTransaction,
  ModelEntities,
  engagedKey,
  emptyEntities,
  emptyFacets,
  isEngagedKey,
  engagingKeys,
  UserData
};
