import { AnyFillTypeTag, FillFacet } from './fill-types';
import { StrokeFacet, StrokeTypeTag } from './stroke-types';
import { AnyPathTypeTag, PathFacet } from './path-types';
import { AnyFontTypeTag, FontFacet } from './font-types';

export * from './types';
export * from './fill-types';
export * from './font-types';
export * from './path-types';
export * from './stroke-types';


type AnyFacetTypeTag = AnyFillTypeTag | StrokeTypeTag |
  AnyPathTypeTag | AnyFontTypeTag

type AnyFacet = FillFacet | StrokeFacet | PathFacet | FontFacet

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

export {
  FillFacetSegment,
  PathFacetSegment,
  FontFacetStyleSegment,
  FontFacetUnitSegment,
  FontFacetSizeSegment,
  StrokeFacetSegment,
  LayerFacetSegment,
  AnyFacetTypeTag,
  AnyFacet,
  AnyFacetSegment
};
