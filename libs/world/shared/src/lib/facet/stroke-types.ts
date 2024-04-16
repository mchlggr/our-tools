import { Color, isColor } from '../color-types';
import { values } from 'lodash';
import { Uuid } from '../types';

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
  id: Uuid,
  type: StrokeTypeTag
  color: Color
  dashArray?: string | number | undefined;
  dashOffset?: string | number | undefined;
  lineCap?: AnyLineCapValue;
  lineJoin?: AnyLineJoinValue
  miterLimit?: number | string | undefined;
  opacity?: number | string | undefined;
  width?: number | string | undefined
}

type SolidStrokeFacet = StrokeFacet & {
  type: SolidStrokeTag
}

type NoneStrokeFacet = StrokeFacet & {
  type: NoneStrokeTag
}

type AnyStrokeFacet = StrokeFacet

const isStrokeFacet = ({ type }: AnyStrokeFacet) => {
  return values(strokeTag).includes(type);
};

const strokeGuard = (selector) => (stroke: StrokeFacet) => {
  // We ignore the rest of the stroke facet params for 'stroke:none'
  // Another extra effect of this is that if the user re-enables the stroke
  // There previous stroke settings will still exist and be applied again
  // This is helpful in case the user accidentally sets the stroke none
  // It also helps keep the element attributes cleaner for inspecting, debugging, etc
  if (stroke.type === strokeTag.none) {
    console.warn('Stroke is of set to none', stroke);
    return undefined;
  } else {
    return selector(stroke);
  }
};

const strokeColor = strokeGuard(({ color }: StrokeFacet) => {
  console.assert(isColor(color));
  return color.value;
});

const strokeDashArray = strokeGuard((stroke: StrokeFacet) => stroke.dashArray);
const strokeDashOffset = strokeGuard((stroke: StrokeFacet) => stroke.dashOffset);
const strokeLineCap = strokeGuard((stroke: StrokeFacet) => stroke.lineCap);
const strokeLineJoin = strokeGuard((stroke: StrokeFacet) => stroke.lineJoin);
const strokeMiterLimit = strokeGuard((stroke: StrokeFacet) => stroke.miterLimit);
const strokeOpacity = strokeGuard((stroke: StrokeFacet) => stroke.opacity);
const strokeWidth = strokeGuard((stroke: StrokeFacet) => stroke.width);

// ---

export {
  NoneStrokeTag,
  SolidStrokeTag,
  GradientStrokeTag,
  strokeTag,
  lineCapValue,
  AnyLineCapValue,
  AnyLineJoinValue,
  StrokeTypeTag,
  StrokeFacet,
  AnyStrokeFacet,
  strokeColor,
  strokeDashArray,
  strokeDashOffset,
  strokeLineCap,
  strokeLineJoin,
  strokeMiterLimit,
  strokeOpacity,
  strokeWidth,
  isStrokeFacet,
  SolidStrokeFacet,
  NoneStrokeFacet
};
