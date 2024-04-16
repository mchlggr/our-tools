import { Uuid } from './types';

type FillFacetTransclusion = 'fill:transclusion'
type PathFacetTransclusion = 'path:transclusion'
type FontFacetStyleTransclusion = 'font-style:transclusion'
type FontFacetUnitTransclusion = 'font-unit:transclusion'
type FontFacetSizeTransclusion = 'font-size:transclusion'
type StrokeFacetTransclusion = 'stroke:transclusion'

type AnyFacetTransclusion = FillFacetTransclusion
  | PathFacetTransclusion
  | FontFacetStyleTransclusion
  | FontFacetUnitTransclusion
  | FontFacetSizeTransclusion
  | StrokeFacetTransclusion


type FacetTransclusion = {
  type: AnyFacetTransclusion
  facetId: Uuid // ID of Facet that this token sources
}

// ---

export {
  FillFacetTransclusion,
  PathFacetTransclusion,
  FontFacetStyleTransclusion,
  FontFacetUnitTransclusion,
  FontFacetSizeTransclusion,
  StrokeFacetTransclusion,
  AnyFacetTransclusion
};
