import { AnyFacet, AnyLayer, Boundary, EntitySelection, EntitySet, Uuid } from '../types';

type AnyEntity = AnyLayer

// type EntityMap = {
//   [uuid: Uuid]: EntityMap
// }

type WorldModel = {
  id: Uuid
  view: object
  committedAt: Date,
  tool: number
  selectingIds: EntitySet
  lockingIds: EntitySet
  parkingIds: EntitySet
  erasingIds: EntitySet
  hintingIds: EntitySet
  editingId: Uuid
  croppingId: Uuid
  focusingId: Uuid
  facets: AnyFacet[]
  boundary: Boundary
  entities: AnyEntity[]
}

const alternativeEntityMapping = {
  "123": {
    childrenIds: ["1"],
    childrenOrder: ["1"]
  }
}

type ModelTransform = (model: WorldModel) => WorldModel
type ModelTransaction = (model: WorldModel) => void

export {
  AnyEntity,
  WorldModel,
  ModelTransform,
  ModelTransaction
};
