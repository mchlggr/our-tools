type Uuid = string

type EntitySet = Set<string>
type EntitySelection = EntitySet

type EntityUuid = string
type Entity = {
  type: string,
  uuid: Uuid
}

// ---


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

type WorldUnit = 'pt' | 'in' | 'px'

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
  WorldUnit,
  Time1D
};
