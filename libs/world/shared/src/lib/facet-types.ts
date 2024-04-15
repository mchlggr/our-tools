import { values } from 'lodash';

type Facet = {
  type: string
  tokenizedIds?: [] // Facet Ids of Tokens that refer to this Facet
}

type TypeTagMapping<Tags = string> = {
  [tag: string]: Tags
}

const fillTag: TypeTagMapping = {
  none: 'fill:none',
  solid: 'fill:solid',
  gradient: 'fill:gradient',
  image: 'fill:image'
};

type NoneFillTypeTag = 'fill:none'
type SolidFillTypeTag = 'fill:solid'
type GradientFillTypeTag = 'fill:gradient'
type ImageFillTypeTag = 'fill:image'

type AnyFillTypeTag = NoneFillTypeTag | SolidFillTypeTag | GradientFillTypeTag | ImageFillTypeTag

const isFillFacet = ({ type }: AnyFillFacet) => {
  return values(fillTag).includes(type);
};

const colorTag: Record<string, AnyColorTypeTag> = {
  hsa: 'color:hsa',
  rgb: 'color:rgb',
  hex: 'color:hex',
  named: 'color:named'
}

type HSAColorTypeTag = 'color:hsa'
type RGBColorTypeTag = 'color:rgb'
type HEXColorTypeTag = 'color:hex'
type NamedColorTypeTag = 'color:named'
type AnyColorTypeTag = HSAColorTypeTag | RGBColorTypeTag | HEXColorTypeTag | NamedColorTypeTag
type Color = { type: AnyColorTypeTag, value: string }

const isColor = ({ type }: Color): boolean => {
  return values(colorTag).includes(type);
};

type AnyFillOpacity = number | string | undefined;
type AnyFillRule = 'nonzero' | 'evenodd' | 'inherit' | undefined;

type FillFacet = Facet & {
  type: AnyFillTypeTag,
  color: Color,
  opacity?: AnyFillOpacity
  rule?: AnyFillRule
}
type NoneFillFacet = FillFacet & { type: NoneFillTypeTag }
type SolidFillFacet = FillFacet & {
  type: SolidFillTypeTag
}
type GradientFillFacet = FillFacet & {
  type: GradientFillTypeTag
  // colors: Ramp<Color>
}

type AnyFillFacet = FillFacet | NoneFillFacet | SolidFillFacet | GradientFillFacet

type ColorImageStyleTag = 'image-style:cover' // fills the entire width and height of the surface
type RatioImageStyleTag = 'image-style:ratio' // maintains the aspect ratio of the image.
type RepeatImageStyleTag = 'image-style:repeat' // repeats the image as a pattern in both x/y directions.
type AnyImageStyleTag = ColorImageStyleTag | RatioImageStyleTag | RepeatImageStyleTag

type ImageFillFacet = FillFacet & {
  type: ImageFillTypeTag
  style: AnyImageStyleTag
}

type NoneStrokeTag = 'stroke:none'
type SolidStrokeTag = 'stroke:solid'
type GradientStrokeTag = 'stroke:gradient'

const strokeTag = {
  none: 'stroke:none',
  solid: 'stroke:solid',
  gradient: 'stroke:gradient'
};
const lineCapValue = {
  butt: 'butt',
  round: 'round',
  square: 'square',
  inherit: 'inherit'
};
type AnyLineCapValue = 'butt' | 'round' | 'square' | 'inherit' | undefined
type AnyLineJoinValue = 'miter' | 'round' | 'bevel' | 'inherit' | undefined;
type StrokeTypeTag = NoneStrokeTag | SolidStrokeTag | GradientStrokeTag
type StrokeFacet = {
  type: StrokeTypeTag
  color: Color
  dashArray?: string | number | undefined;
  dashOffset?: string | number | undefined;
  lineCap?: AnyLineCapValue;
  lineJoin?: AnyLineJoinValue
  miterLimit?: number | string | undefined;
  opacity?: number | string | undefined;
  width?: number | string | undefined;
}



type AnyStrokeFacet = StrokeFacet

const isStrokeFacet = ({ type }: AnyStrokeFacet) => {
  return values(strokeTag).includes(type);
};

// type PositionTypeTag = 'position:2d' | 'position:3d'
// type PositionFacet = { type: PositionTypeTag }

type RoughPathTag = 'path:rough'
const pathTag = {
  rough: 'path:rough'
};
type AnyPathTypeTag = RoughPathTag
type PathFacet = { type: AnyPathTypeTag }

const fontStyleTag = {
  bold: 'font-style:bold',
  regular: 'font-style:regular',
  italic: 'font-style:italic'
};
type BoldFontStyleTag = 'font-style:bold'
type RegularFontStyleTag = 'font-style:regular'
type ItalicFontStyleTag = 'font-style:italic'
type AnyFontStyleTag = BoldFontStyleTag | RegularFontStyleTag | ItalicFontStyleTag

type PointFontUnitTag = 'font-unit:pt'
type InchFontUnitTag = 'font-unit:inch'
type PixelFontUnitTag = 'font-unit:px'

const fontUnitTag = {
  point: 'font-unit:pt',
  inch: 'font-unit:inch',
  pixel: 'font-unit:px'
};
type AnyFontUnitTag = PointFontUnitTag | InchFontUnitTag | PixelFontUnitTag
type FontSizeFacet = { type: AnyFontStyleTag, unit: AnyFontUnitTag, value: number }

type AnyFacetTypeTag = AnyFillTypeTag | StrokeTypeTag |
  AnyPathTypeTag | AnyFontStyleTag

type AnyFacet = FillFacet | StrokeFacet | PathFacet | FontSizeFacet
type UnknownFacetTag = string

// ---

type FacetTransform = (facet: Facet) => Facet
type FacetTransaction = (facet: Facet) => void

// ---

// type UnknownEntitySegment = string
// type AnyEntitySegment =

//TODO: type Point2DFacetSegment = 'point2D'
//TODO: type ScalarFacetSegment = 'scalar'
//TODO: type SpacingFacetSegment = ['scalar', 'scalar', 'scalar', 'scalar'] // for margin or padding?
type FillFacetSegment = 'fill'
type PathFacetSegment = 'path'
type FontFacetStyleSegment = 'font-style'
type FontFacetUnitSegment = 'font-unit'
type FontFacetSizeSegment = 'font-size'
type StrokeFacetSegment = 'stroke'
type LayerFacetSegment =
  StrokeFacetSegment
  | FillFacetSegment
  | PathFacetSegment
  | FontFacetStyleSegment
  | FontFacetUnitSegment
  | FontFacetSizeSegment
type AnyFacetSegment = LayerFacetSegment
type UnknownFacetSegment = string

const facetTag = {
  fill: 'facet:fill',
  path: 'facet:path',
  fontStyle: 'facet:font-style',
  fontUnit: 'facet:font-unit',
  fontSize: 'facet:font-size',
  stroke: 'facet:stroke'
};


// ---

export {
  Facet,
  AnyFillTypeTag,
  FillFacet,
  StrokeTypeTag,
  StrokeFacet,
  // PositionTypeTag,
  // PositionFacet,
  AnyPathTypeTag,
  PathFacet,
  AnyFontStyleTag,
  AnyFontUnitTag,
  FontSizeFacet,
  AnyFacetTypeTag,
  AnyFacet,
  FacetTransform,
  FacetTransaction,
  UnknownFacetTag,
  AnyFacetSegment,
  UnknownFacetSegment,
  FillFacetSegment,
  PathFacetSegment,
  FontFacetStyleSegment,
  FontFacetUnitSegment,
  FontFacetSizeSegment,
  StrokeFacetSegment,
  TypeTagMapping,
  LayerFacetSegment,
  fillTag,
  facetTag,
  AnyFillFacet,
  AnyStrokeFacet,
  isFillFacet,
  isStrokeFacet,
  colorTag,
  Color,
  isColor,
  strokeTag
};
