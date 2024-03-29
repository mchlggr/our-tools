import { AnyFacet, AnyLayer, Boundary, EntitySelection, EntitySet, Uuid } from '@penumbra/world-shared';

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

type ModelTransform = (model: WorldModel) => WorldModel
type ModelTransaction = (model: WorldModel) => void

export {
  AnyEntity,
  WorldModel,
  ModelTransform,
  ModelTransaction
};
