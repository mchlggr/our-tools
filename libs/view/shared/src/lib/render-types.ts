
const renderTag = {
  webGl: 'render:web-gl',
  webXr: 'render:web-xr',
  html: 'render:html'
};
type RenderWebGL = 'render:web-gl'
type RenderWebXR = 'render:web-xr'
type RenderHTML = 'render:html'
type AnyRender = RenderWebGL | RenderWebXR | RenderHTML

// ---

export {
  renderTag,
  RenderWebGL,
  RenderWebXR,
  RenderHTML,
  AnyRender
};
