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
}

type ModelEdge = {
  type: string
  id: Uuid,
  from: EdgeConnection | Point2D,
  to: EdgeConnection | Point2D,
  label?: string,
  // Facets color
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
const awareKey = {
  selecting: 'selectingIds',
  locking: 'lockingIds',
  parking: 'parkingIds',
  erasing: 'erasingIds',
  hinting: 'hintingIds'
}

type AwareIdsByType = {
  [entityOrFacetType: string]: Uuid[]
}

type AwareUser = {
    tool: UnknownToolTag,
      //TODO:   toolTag: { UserId: toolTag }
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
  // id: Uuid
  lastModifiedBy?: Uuid,
  lastModifiedAt: Date,
  lastModifiedCounter: unknown, // Add A.Counter
  lastModifiedIds?: AwareIdsByType, // Add A.Counter
  users: {
    [userId: string]: AwareUser
  }
  // Used for history snapshot previews
  boundary: Boundary
  // Segmented Facet Arrays
  facets: ModelFacets<AnyFacet>
  // Segmented Entity Arrays
  entities: {
    'entity:layer': ModelEntities<AnyLayer>
    'entity:surface': ModelEntities<AnySurface>
    'entity:scene': ModelEntities<AnyScene>
    'entity:space': ModelEntities<AnySpace>
  },
  // Connections between entities
  edges: ModelEdge[]
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
  awareKey,
  emptyEntities,
  emptyFacets
};
