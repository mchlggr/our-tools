import { Boundary, EntityUuid, Entity } from './types';
import { FontSizeFacet, PathFacet } from './facet-types';

type LayerBoundary = Boundary
type LayerEntity = Entity

type RectangleLayerTypeTag = 'layer:rectangle'
type EllipseLayerTypeTag = 'layer:ellipse'
type LineLayerTypeTag = 'layer:line'
type TextLayerTypeTag = 'layer:text'
type PencilLayerTypeTag = 'layer:pencil'

type RectangleLayer =  LayerEntity & {
  type: RectangleLayerTypeTag,
  id: EntityUuid,
  x: number,
  y: number,
  width: number,
  height: number
}

type EllipseLayer =  LayerEntity &  {
  type: EllipseLayerTypeTag,
  id: EntityUuid,
  cx: number,
  cy: number,
  rx: number,
  ry: number
}

type LineLayer =  LayerEntity & {
  type: LineLayerTypeTag,
  id: EntityUuid,
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

type TextLayer =  LayerEntity &  {
  type: TextLayerTypeTag,
  id: EntityUuid,
  x: number,
  y: number,
  fontSize: FontSizeFacet,
  content: string,
  boundary: LayerBoundary
}


type PencilLayer = LayerEntity & {
  type: PencilLayerTypeTag,
  id: EntityUuid,
  path: PathFacet,
  d: string,
  fill: 'none',
  stroke: 'none',
  boundary: LayerBoundary // Use for better selection performance
}

type AnyLayerTypeTag = RectangleLayerTypeTag | EllipseLayerTypeTag | LineLayerTypeTag | TextLayerTypeTag | PencilLayerTypeTag
type AnyLayer = RectangleLayer | EllipseLayer |
  LineLayer | TextLayer | PencilLayer

// ---

export {
  AnyLayerTypeTag,
  LayerEntity,
  RectangleLayerTypeTag,
  RectangleLayer,
  EllipseLayerTypeTag,
  EllipseLayer,
  LineLayerTypeTag,
  LineLayer,
  TextLayerTypeTag,
  TextLayer,
  PencilLayerTypeTag,
  PencilLayer,
  AnyLayer
};
