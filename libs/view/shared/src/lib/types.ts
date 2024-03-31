import { ComponentType } from 'react';

type RenderWebGL = 'render:web-gl'
type RenderWebXR = 'render:web-xr'
type RenderHTML = 'render:html'
type AnyRender = RenderWebGL | RenderWebXR | RenderHTML

type ViewLayerTypeTag = "view:layer"
type ViewSurfaceTypeTag = "view:surface"
type ViewSceneTypeTag = "view:scene"
type AnyViewTag = ViewLayerTypeTag | ViewSurfaceTypeTag | ViewSceneTypeTag

type View = {
  type: AnyViewTag,
  resizable: string
  unlisted: boolean
  components: {
    [render in AnyRender]: ComponentType
  }
}

// ---

export { View }

