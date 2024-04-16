import { Facet, TypeTagMapping } from './types';

// Font Style Facet
const fontWeightTag = {
  bold: 'font-weight:bold',
  regular: 'font-weight:regular',
  italic: 'font-weight:italic'
};
type BoldFontWeightTag = 'font-weight:bold'
type RegularFontWeightTag = 'font-weight:regular'
type ItalicFontWeightTag = 'font-weight:italic'
type AnyFontWeightTag = BoldFontWeightTag | RegularFontWeightTag | ItalicFontWeightTag

type FontWeightValue = {
  type: AnyFontWeightTag
}

// Font Unit

type PointFontUnitTag = 'font-unit:pt'
type InchFontUnitTag = 'font-unit:inch'
type PixelFontUnitTag = 'font-unit:px'

const fontUnitTag = {
  point: 'font-unit:pt',
  inch: 'font-unit:inch',
  pixel: 'font-unit:px'
};
type AnyFontUnitTag = PointFontUnitTag | InchFontUnitTag | PixelFontUnitTag
type FontSizeValue = {
  type: AnyFontUnitTag
  value: string // number string in units
}

// type FontSizkeFacet = { type: AnyFontWeightTag, unit: AnyFontUnitTag, value: number }

const fontTag: TypeTagMapping = {
  point: 'point',
  paragraph: 'paragraph'
};

type PointFontTypeTag = 'font:point'
type ParagraphFontTypeTag = 'font:paragraph'
type AnyFontTypeTag = PointFontTypeTag | ParagraphFontTypeTag

//TODO: consider renaming to FontFact
type FontFacet = Facet & {
  type: AnyFontTypeTag,
  size: FontSizeValue
  weight: FontWeightValue
}

type PointFontFacet = FontFacet & {
  type: PointFontTypeTag
}

type ParagraphFontFacet = FontFacet & {
  type: ParagraphFontTypeTag
}

type AnyFontFacet = PointFontFacet | ParagraphFontFacet

export {
  PointFontFacet,
  ParagraphFontFacet,
  AnyFontFacet,
  AnyFontTypeTag,
  FontFacet,
  fontTag,
  fontUnitTag,
  fontWeightTag,
  BoldFontWeightTag,
  RegularFontWeightTag,
  ItalicFontWeightTag,
  AnyFontWeightTag,
  PointFontUnitTag,
  InchFontUnitTag,
  PixelFontUnitTag,
  AnyFontUnitTag
};

