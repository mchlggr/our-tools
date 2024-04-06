import { Entity, EntityUuid  } from './types';
import { FillFacetSegment } from './facet-types'

type UnknownSurface = string
type SurfaceEntity = Entity

const surfaceTag = {
  flat: 'surface:flat'
}

type FlatSurfaceTag = 'surface:flat'

type FlatSurfaceFacets = FillFacetSegment
type FlatSurface = SurfaceEntity & {
  type: FlatSurfaceTag,
  id: EntityUuid,
  name: string,
  icon: string,
  facets: FlatSurfaceFacets[]
}

type AnySurface = FlatSurface

export { UnknownSurface, AnySurface, FlatSurfaceTag }
