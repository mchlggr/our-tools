import { Point2D, Uuid, AnyWorldUnit, worldUnitTag } from './types';
import { UnknownToolTag } from './unknown-types';
import { WorldModel } from './model-types';
import { Patch } from 'immer';
import { WorldChange, WorldHistory } from './history-types';

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

type LayerEntitySegment = 'entity:layer'
type SurfaceEntitySegment = 'entity:surface'
type SceneEntitySegment = 'entity:scene'
type SpaceEntitySegment = 'entity:space'
type AnyEntitySegment = LayerEntitySegment | SurfaceEntitySegment | SceneEntitySegment | SpaceEntitySegment

type EntityReference = { type: AnyEntitySegment, id: Uuid }

type WorldDocUrl = string

// ---

const latestVersion = '0.0.1';
const defaultVersion = latestVersion;
const defaultUnit = worldUnitTag['pixel'];

// ---

type WorldArchive = {
  id: Uuid
  version: string
  unit: AnyWorldUnit,
  doc: WorldModel,
  docUrl: WorldDocUrl
  // overlay: WorldOverlay,
  history: WorldHistory // TODO: consider moving to WorldModel
}

// ---

  export {
  WorldArchive,
  EntityReference,
  latestVersion,
  defaultVersion,
  defaultUnit,
  FacetReference
};
