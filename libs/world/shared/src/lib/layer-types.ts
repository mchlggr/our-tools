import { Boundary, EntityUuid, Entity } from './types';
import { FontSizeFacet, PathFacet } from './facet-types';

type LayerBoundary = Boundary
type LayerEntity = Entity

type RectangleLayerType = 'layer:rectangle'
type EllipseLayerType = 'layer:ellipse'
type LineLayerType = 'layer:line'
type TextLayerType = 'layer:text'
type PencilLayerType = 'layer:pencil'

type RectangleLayer =  LayerEntity & {
  type: RectangleLayerType,
  id: EntityUuid,
  x: number,
  y: number,
  width: number,
  height: number
}

type EllipseLayer =  LayerEntity &  {
  type: EllipseLayerType,
  id: EntityUuid,
  cx: number,
  cy: number,
  rx: number,
  ry: number
}

type LineLayer =  LayerEntity & {
  type: LineLayerType,
  id: EntityUuid,
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

type TextLayer =  LayerEntity &  {
  type: TextLayerType,
  id: EntityUuid,
  x: number,
  y: number,
  fontSize: FontSizeFacet,
  content: string,
  boundary: LayerBoundary
}


type PencilLayer = LayerEntity & {
  type: PencilLayerType,
  id: EntityUuid,
  path: PathFacet,
  d: string,
  fill: 'none',
  stroke: 'none',
  boundary: LayerBoundary // Use for better selection performance
}

type AnyLayerType = RectangleLayerType | EllipseLayerType | LineLayerType | TextLayerType | PencilLayerType
type AnyLayer = RectangleLayer | EllipseLayer |
  LineLayer | TextLayer | PencilLayer

// ---

export {
  AnyLayerType,
  LayerEntity,
  RectangleLayerType,
  RectangleLayer,
  EllipseLayerType,
  EllipseLayer,
  LineLayerType,
  LineLayer,
  TextLayerType,
  TextLayer,
  PencilLayerType,
  PencilLayer,
  AnyLayer
};
