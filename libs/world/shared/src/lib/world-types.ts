import { Point2D, Uuid, WorldUnit } from './types';
import { WorldModel } from './model-types';
import { UnknownToolTag } from './unknown-types';

// ---

type WorldComment = {
  by: '',
  content: ''
}

// Is loaded as a separate CRDT
type WorldReview = {
  comments: {
    [entityId: Uuid]: WorldComment[]
  }
}

// type TokenReference = {}
type FacetReference = { type: string, id: Uuid }

type LayerEntitySegment = "entity:layer"
type SurfaceEntitySegment = "entity:surface"
type SceneEntitySegment = "entity:scene"
type SpaceEntitySegment = "entity:space"
type AnyEntitySegment = LayerEntitySegment | SurfaceEntitySegment | SceneEntitySegment | SpaceEntitySegment

type EntityReference = { type: AnyEntitySegment, id: Uuid }

type WorldDocUrl = string

// ---

type WorldTimeline = WorldModel[]

type WorldHistory = {
  at: number[] // branching address for present timeline location
  timeline: WorldTimeline, // Cached spacial history of document
}

const timeline = (model: WorldModel): WorldTimeline => {
  return [];
};

// ---

type WorldArchive = {
  id: Uuid
  version: string
  unit: WorldUnit,
  // doc: WorldDoc
  docUrl: WorldDocUrl
  // overlay: WorldOverlay,
  history: WorldHistory
}

// ---

export {
  WorldModel,
  WorldTimeline,
  WorldArchive,
  EntityReference
};
