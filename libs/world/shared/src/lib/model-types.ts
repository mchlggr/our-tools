import { AnyFacet, AnyLayer, Boundary, EntitySelection, EntitySet, Uuid } from '../types';

type AnyEntity = AnyLayer

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

type ModelTransform = (model: WorldModel) => WorldModel
type ModelTransaction = (model: WorldModel) => void

export {
  AnyEntity,
  WorldModel,
  ModelTransform,
  ModelTransaction
};
