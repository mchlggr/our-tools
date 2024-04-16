import { Entity, EntityUuid  } from './types';
import { FillFacetSegment } from './facet';

type UnknownSurface = string
type SurfaceEntity = Entity

const surfaceTag = {
  flat: 'surface:flat'
}

type PaperSurfaceTag = 'surface:paper' // Stack based flow for blocks
type FlatSurfaceTag = 'surface:flat' // Free Form placement of layers

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
