import { ComponentType } from 'react';

type RenderWebGL = 'render:web-gl'
type RenderWebXR = 'render:web-xr'
type RenderHTML = 'render:html'
type AnyRender = RenderWebGL | RenderWebXR | RenderHTML

type ViewLayerType = "view:layer"
type ViewSurfaceType = "view:surface"
type ViewSpaceType = "view:space"
type AnyView = ViewLayerType | ViewSurfaceType | ViewSpaceType

type View = {
  type: AnyView,
  resizable: string
  unlisted: boolean
  components: {
    [render in AnyRender]: ComponentType
  }
}

