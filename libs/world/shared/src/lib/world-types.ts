import { Boundary, EntitySelection, EntitySet, Uuid } from './types';
import { AnyLayer } from './layer-types';

// ---

type AnyEntity = AnyLayer

type WorldModel = {
  uuid: Uuid
  view: object
  committedAt: number
  tool: number
  selection: EntitySelection
  locked: EntitySet
  parked: EntitySet
  facets: AnyFacet[]
  boundary: Boundary
  entities: AnyEntity[]
}

type WorldHistory = WorldModel[]

type WorldUnit = 'pt' | 'in' | 'px'

type WorldArchive = {
  uuid: Uuid
  buildVersion: string
  at: number
  unit: WorldUnit,
  // overlay: object
  history: WorldHistory
}

// ---

export { AnyEntity, WorldModel, WorldHistory, WorldUnit, WorldArchive }
