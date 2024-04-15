import { Boundary, EntityUuid, Entity } from './types';
import { FontSizeFacet, LayerFacetSegment, PathFacet } from './facet-types';
import { values } from 'lodash';

type LayerBoundary = Boundary
type LayerEntity = Entity & {
 facets: LayerFacetSegment[]
}



const layerTag = {
 rectangle: "layer:rectangle",
 ellipse: "layer:ellipse",
 line: "layer:line",
 text: "layer:text",
 pencil: "layer:pencil",
}
type RectangleLayerTypeTag = 'layer:rectangle'
type EllipseLayerTypeTag = 'layer:ellipse'
type LineLayerTypeTag = 'layer:line'
type TextLayerTypeTag = 'layer:text'
type PencilLayerTypeTag = 'layer:pencil'

type RectangleLayer =  LayerEntity & {
  type: RectangleLayerTypeTag,
  id: EntityUuid,
  facets: ['fill', 'stroke']
  // x: number,
  // y: number,
  // width: number,
  // height: number
}

const reactangleLayerFacetTags = ['fill', 'stroke']

const isRectangleLayer = ({type}: LayerEntity) => {
  return values(layerTag).includes(type)
}

type EllipseLayer =  LayerEntity &  {
  type: EllipseLayerTypeTag,
  id: EntityUuid,
  facets: ['fill', 'stroke']
  // cx: number,
  // cy: number,
  // rx: number,
  // ry: number
}

type LineLayer =  LayerEntity & {
  type: LineLayerTypeTag,
  id: EntityUuid,
  facets: ['stroke']
  // x1: number,
  // y1: number,
  // x2: number,
  // y2: number
}

type TextLayer =  LayerEntity &  {
  type: TextLayerTypeTag,
  id: EntityUuid,
  facets: ['font-style', 'font-unit', 'font-size'],
  // x: number,
  // y: number,
  // fontSize: FontSizeFacet,
  // content: string,
  // boundary: LayerBoundary
}


type PencilLayer = LayerEntity & {
  type: PencilLayerTypeTag,
  id: EntityUuid,
  facets: ['stroke', 'path']
  // path: PathFacet,
  // d: string,
  // fill: 'none',
  // stroke: 'none',
  // boundary: LayerBoundary // Use for better selection performance
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
  AnyLayer,
  isRectangleLayer,
  reactangleLayerFacetTags
};
