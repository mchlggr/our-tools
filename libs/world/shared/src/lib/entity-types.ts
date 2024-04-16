import { Uuid } from './types';

type LayerEntitySegment = 'entity:layer'
type SurfaceEntitySegment = 'entity:surface'
type SceneEntitySegment = 'entity:scene'
type SpaceEntitySegment = 'entity:space'
type AnyEntitySegment = LayerEntitySegment | SurfaceEntitySegment | SceneEntitySegment | SpaceEntitySegment

type EntityReference = {
  type: AnyEntitySegment,
  id: Uuid,
  //TODO: state: string
}

const entityTag = {
 layer: 'entity:layer',
 surface: 'entity:surface',
 scene: 'entity:scene',
 space: 'entity:space'
}

// ---

export {
  LayerEntitySegment,
  SurfaceEntitySegment,
  SceneEntitySegment,
  SpaceEntitySegment,
  AnyEntitySegment,
  EntityReference,
  entityTag
};
