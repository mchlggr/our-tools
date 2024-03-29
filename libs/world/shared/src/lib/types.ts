type Uuid = string

type EntitySet = Set<string>
type EntitySelection = EntitySet

type EntityUuid = string
type Entity = {
  type: string,
  uuid: Uuid
}

type Boundary = {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

// ---

export {
  Uuid,
  EntitySet,
  EntitySelection,
  EntityUuid,
  Entity,
  Boundary
};
