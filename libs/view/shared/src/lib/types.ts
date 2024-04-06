import { ComponentType } from 'react';

const renderTag = {
  webGl: 'render:web-gl',
  webXr: 'render:web-xr',
  html: 'render:html'
};
type RenderWebGL = 'render:web-gl'
type RenderWebXR = 'render:web-xr'
type RenderHTML = 'render:html'
type AnyRender = RenderWebGL | RenderWebXR | RenderHTML


const viewTag = {
  layer: 'view:layer',
  surface: 'view:surface',
  scene: 'view:scene'
};

type ViewLayerTypeTag = 'view:layer'
type ViewSurfaceTypeTag = 'view:surface'
type ViewSceneTypeTag = 'view:scene'
type AnyViewTag = ViewLayerTypeTag | ViewSurfaceTypeTag | ViewSceneTypeTag

type View = {
  type: AnyViewTag,
  resizable: string, // ('x' | 'y' | 'z')[]
  rotatable: string, //string[]
  unlisted: boolean
  components: {
    [render in AnyRender]: ComponentType
  }
}

// ---

export {
  View,
  renderTag,
  viewTag
};

