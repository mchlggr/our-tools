import { values } from 'lodash';
import { Color, isColor } from '../color-types';
import { Facet, TypeTagMapping } from './types';
import { Uuid } from '../types';

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

const getFillColor = ({ color }: FillFacet) => {
  console.assert(isColor(color));
  return color.value;
};


type AnyFillOpacity = number | string | undefined;
type AnyFillRule = 'nonzero' | 'evenodd' | 'inherit' | undefined;

type FillFacet = Facet & {
  id: Uuid,
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

// ---

export {
  fillTag,
  NoneFillTypeTag,
  SolidFillTypeTag,
  GradientFillTypeTag,
  ImageFillTypeTag,
  AnyFillTypeTag,
  isFillFacet,
  getFillColor,
  AnyFillOpacity,
  AnyFillRule,
  FillFacet,
  NoneFillFacet,
  SolidFillFacet,
  GradientFillFacet,
  AnyFillFacet,
  ColorImageStyleTag,
  RatioImageStyleTag,
  RepeatImageStyleTag,
  AnyImageStyleTag,
  ImageFillFacet

};
