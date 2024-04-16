import { Entity, Uuid } from '../types';

const modelTag = {
  sphere: 'model:sphere',
  plane: 'model:plane',
  circle: 'model:circle',
  box: 'model:box',
  torus: 'model:torus',
  line: 'model:line',
  cylinder: 'model:cylinder',
  ring: 'model:ring',
  cone: 'model:cone',
  tube: 'model:tube' // Width can vary to simulate a 3D brush stroke
};

type SphereModelTypeTag = 'model:sphere'
type PlaneModelTypeTag = 'model:plane'
type CircleModelTypeTag = 'model:circle'
type BoxModelTypeTag = 'model:box'
type TorusModelTypeTag = 'model:torus'
type LineModelTypeTag = 'model:line'
type CylinderModelTypeTag = 'model:cylinder'
type RingModelTypeTag = 'model:ring'
type ConeModelTypeTag = 'model:cone'
type TubeModelTypeTag = 'model:tube'

type AnyModelTypeTag =
  SphereModelTypeTag
  | PlaneModelTypeTag
  | CircleModelTypeTag
  | BoxModelTypeTag
  | TorusModelTypeTag
  | LineModelTypeTag
  | CylinderModelTypeTag
  | RingModelTypeTag
  | ConeModelTypeTag
  | TubeModelTypeTag

type EntityModel = Entity & {
  facets: []
}

type MaterialFacetTypeTag = 'facet:material'
type OutlineFacetTypeTag = 'facet:outline'

type MaterialFacet = {
  type: MaterialFacetTypeTag
}

type OutlineFacet = {
  type: OutlineFacetTypeTag
}


type SphereModel = EntityModel & {
  id: Uuid,
  type: SphereModelTypeTag
  facets: ['material', 'outline']
}


type AnyModelEntity = SphereModel

// ---

export {
  modelTag,
  SphereModelTypeTag,
  PlaneModelTypeTag,
  CircleModelTypeTag,
  BoxModelTypeTag,
  TorusModelTypeTag,
  LineModelTypeTag,
  CylinderModelTypeTag,
  RingModelTypeTag,
  ConeModelTypeTag,
  TubeModelTypeTag,
  AnyModelTypeTag,
  EntityModel,
  MaterialFacetTypeTag,
  OutlineFacetTypeTag,
  AnyModelEntity,
  MaterialFacet,
  OutlineFacet
};

