import { Boundary, EntitySet, Uuid } from './types';
import { Point2D } from './types';
import { UnknownToolTag } from './unknown-types';
import { AnySurface } from './surface-types';
import { AnySpace } from './space-types';
import { AnyScene } from './scene-types';
import { AnyFacet, AnyFacetSegment } from './facet-types';
import { AnyLayer } from './layer-types';


type ModelEntities<EntityType> = {
  [entityId: string]: EntityType
}

type ModelFacets<FacetType> = {
  [facetSegment in AnyFacetSegment]: FacetType[];
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


type WorldModel = {
  id: Uuid
  view: object
  changedBy: Uuid,
  changedAt: Date,
  tool: UnknownToolTag,
  selectingIds: EntitySet
  // Consider moving down to space, scene or surface
  lockingIds: EntitySet
  parkingIds: EntitySet
  erasingIds: EntitySet
  hintingIds: EntitySet
  //
  editingId: Uuid
  croppingId: Uuid
  focusingId: Uuid
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
  ModelTransaction
};
