type Facet = { type: string }

type TypeTagMapping<Tags=string> = {
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

type Color = string
type FillFacet = Facet & { type: AnyFillTypeTag }
type NoneFillFacet = FillFacet & { type: NoneFillTypeTag }
type SolidFillFacet = FillFacet & {
  type: SolidFillTypeTag
  color: Color
}
type GradientFillFacet = FillFacet & {
  type: GradientFillTypeTag
  // colors: Ramp<Color>
}
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

const strokeType = {
  none: 'stroke:none',
  solid: 'stroke:solid',
  gradient: 'stroke:gradient'
};
type StrokeTypeTag = NoneStrokeTag | SolidStrokeTag | GradientStrokeTag
type StrokeFacet = { type: StrokeTypeTag }

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

type FillFacetSegment = 'fill'
type PathFacetSegment = 'path'
type FontFacetStyleSegment = 'font-style'
type FontFacetUnitSegment = 'font-unit'
type FontFacetSizeSegment = 'font-size'
type StrokeFacetSegment = 'stroke'
type AnyFacetSegment =
  StrokeFacetSegment
  | FillFacetSegment
  | PathFacetSegment
  | FontFacetStyleSegment
  | FontFacetUnitSegment
  | FontFacetSizeSegment
type UnknownFacetSegment = string

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
  fillTag,
  TypeTagMapping
};
