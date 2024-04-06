import { Entity, EntityUuid  } from './types';
import { FillFacetSegment } from './facet-types'

type UnknownScene = string
type SceneEntity = Entity

const sceneTag = {
  flat: 'scene:flat'
}

type FlatSceneTag = 'scene:flat'

type FlatSceneFacets = FillFacetSegment
type FlatScene = SceneEntity & {
  type: FlatSceneTag,
  id: EntityUuid,
  name: string,
  icon: string,
  facets: FlatSceneFacets[]
}

type AnyScene = FlatSceneTag

export { UnknownScene, AnyScene, FlatSceneTag }
