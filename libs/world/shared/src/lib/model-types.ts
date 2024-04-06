import { Boundary, EntitySet, Uuid } from './types';
import { Point2D } from './types';
import { UnknownToolTag } from './unknown-types';
import { AnySurface } from './surface-types';
import { AnySpace } from './space-types';
import { AnyScene } from './scene-types';
import { AnyFacet, AnyFacetSegment } from './facet-types';
import { AnyLayer } from './layer-types';
import { FacetReference } from './world-types';


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

type WorldModel = {
  // id: Uuid
  modifiedBy: Uuid,
  modifiedAt: Date,
  modifiedCounter: unknown, // Add A.Counter
  tool: UnknownToolTag,
  selectingIds: EntitySet // Gets applied from awareness on commit
  // Consider moving down to space, scene or surface
  lockingIds: EntitySet // Gets applied from awareness on commit
  parkingIds: EntitySet // Gets applied from awareness on commit
  erasingIds: EntitySet // Gets applied from awareness on commit
  hintingIds: EntitySet // Gets applied from awareness on commit
  //
  editingIds: EntitySet
  croppingIds: EntitySet
  focusingIds: EntitySet
  //
  // Used for history snapshot previews
  boundary: Boundary
  // Segmented Facet Arrays
  facets: ModelFacets<AnyFacet>
  // Segmented Entity Arrays
  entities: {
    layers: ModelEntities<AnyLayer>
    surfaces: ModelEntities<AnySurface>
    scenes: ModelEntities<AnyScene>
    spaces: ModelEntities<AnySpace>
  }
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
  WorldModel,
  ModelTransform,
  ModelTransaction,
  emptyEntities,
  emptyFacets
};
