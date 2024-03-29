import { Boundary, EntityUuid, Entity } from './types';

type LayerBoundary = Boundary
type LayerEntity = Entity

type RectangleLayerType = 'layer:rectangle'
type EllipseLayerType = 'layer:ellipse'
type LineLayerType = 'layer:line'
type TextLayerType = 'layer:text'
type PencilLayerType = 'layer:pencil'

type RectangleLayer =  LayerEntity & {
  type: RectangleLayerType,
  uuid: EntityUuid,
  x: number,
  y: number,
  width: number,
  height: number
}

type EllipseLayer =  LayerEntity &  {
  type: EllipseLayerType,
  uuid: EntityUuid,
  cx: number,
  cy: number,
  rx: number,
  ry: number
}

type LineLayer =  LayerEntity & {
  type: LineLayerType,
  uuid: EntityUuid,
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

type TextLayer =  LayerEntity &  {
  type: TextLayerType,
  uuid: EntityUuid,
  x: number,
  y: number,
  fontSize: FontSizeFacet,
  content: string,
  boundary: LayerBoundary
}


type PencilLayer = LayerEntity & {
  type: PencilLayerType,
  uuid: EntityUuid,
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
