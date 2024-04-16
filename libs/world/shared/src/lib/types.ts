import { NonEmptyString } from '@our-tools/extension';
import { AnyEntitySegment, EntityReference } from './entity-types';
import { UserData } from './doc-types';
import { TypeTagMapping, UnknownFacetTag } from './facet';

type Uuid = string | ''
type UserId = Uuid

type EntityUuid = string
type EntityTypeTag = NonEmptyString
type Entity = {
  type: string,
  id: Uuid,
  //TODO: state: string
  facets: UnknownFacetTag[]
  pts: Point2D[],
  text?: string,
  parent?: EntityReference
  children?: EntityReference[]
  // connections: EdgeReferences[]
  data?: UserData
}

// ---


const emptyBoundary = Object.freeze({
  minX: 0,
  minY: 0,
  maxX: 0,
  maxY: 0
});

//TODO: refactor Boundary to: type BoundaryBox = {
//   min: Point2D
//   max: Point2D
// }

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

type PathNetwork2D = {
  vertices: Point2D[],
  edges: Point2D[],
  faces: Point2D[]
}

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

const typePattenPrefix = /(^[a-z]+)/;
const typePattenSuffix = /([a-z]+$)/;

const typePrefix = (type: string): string => {
  const [prefix] = type.match(typePattenPrefix) || [];
  if (!prefix) throw new Error(`Type ${type} is missing prefix`);

  return prefix;
};

const typeSuffix = (type: string): string => {
  const [suffix] = type.match(typePattenSuffix) || [];
  if (!suffix) throw new Error(`Type ${type} is missing suffix`);

  return suffix;
}

// ---

export {
  Uuid,
  // AwareIds,
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
  emptyBoundary,
  UserId,
  typeSuffix,
  typePrefix
};
