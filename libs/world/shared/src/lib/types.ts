import { NonEmptyString } from '@penumbra/extension';
import { TypeTagMapping, UnknownFacetTag } from './facet-types';

type Uuid = string | ''

type EntitySet = {
  [userId: string]: Uuid[]
}
type EntitySelection = EntitySet

type EntityUuid = string
type EntityTypeTag = NonEmptyString
type Entity = {
  type: EntityTypeTag,
  id: Uuid,
  //
  facets: UnknownFacetTag[]
  //
  x1: number
  y1: number
  z1: number
  //
  x2: number
  y2: number
  z2: number
}

// ---


const emptyBoundary = Object.freeze({
  minX: 0,
  minY: 0,
  maxX: 0,
  maxY: 0
});

type Boundary = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

// ---


// 2D and 3D Scale
type Scale2D = { width: number, height: number }
type Scale3D = { width: number, height: number, depth: number }

// 2D and 3D Point
type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

// Array of points for motion tracing, mouse tracing, then used to derive a 'delta'
type Path2D = Point2D[]
type Path3D = Point3D[]

// ---

type Time1D = Date[]

// ---


type InchWorldUnitTag = 'in'
type PixelWorldUnitTag = 'px'
type AnyWorldUnit = InchWorldUnitTag | PixelWorldUnitTag
type UnkownWorldUnit = string
const worldUnitTag: TypeTagMapping<AnyWorldUnit> = {
  inch: 'in',
  pixel: 'px'
};

// ---

export {
  Uuid,
  EntitySet,
  EntitySelection,
  EntityUuid,
  Entity,
  Boundary,
  Scale2D,
  Scale3D,
  Point2D,
  Point3D,
  Path2D,
  Path3D,
  AnyWorldUnit,
  Time1D,
  worldUnitTag,
  InchWorldUnitTag,
  PixelWorldUnitTag,
  emptyBoundary
};
