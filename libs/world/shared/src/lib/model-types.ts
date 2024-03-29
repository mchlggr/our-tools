import { AnyFacet, AnyLayer, Boundary, EntitySelection, EntitySet, Uuid } from '@penumbra/world-shared';

type AnyEntity = AnyLayer

type WorldModel = {
  uuid: Uuid
  view: object
  committedAt: Date,
  tool: number
  selectingIds: EntitySelection
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
