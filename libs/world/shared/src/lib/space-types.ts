import { Entity, EntityUuid  } from './types';
import { FillFacetSegment } from './facet-types'

type UnknownSpace = string
type SpaceEntity = Entity

const spaceTag = {
  flat: 'space:flat'
}

type FlatSpaceTag = 'space:flat'

type FlatSpaceFacets = FillFacetSegment
type FlatSpace = SpaceEntity & {
  type: FlatSpaceTag,
  id: EntityUuid,
  name: string,
  icon: string,
  facets: FlatSpaceFacets[]
}

type AnySpace = FlatSpaceTag

export { UnknownSpace, AnySpace, FlatSpaceTag }
