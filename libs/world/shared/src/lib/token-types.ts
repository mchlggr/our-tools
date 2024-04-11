type FillFacetToken = 'fill:token'
type PathFacetToken = 'path:token'
type FontFacetStyleToken = 'font-style:token'
type FontFacetUnitToken = 'font-unit:token'
type FontFacetSizeToken = 'font-size:token'
type StrokeFacetToken = 'stroke:token'

type AnyFacetToken = FillFacetToken
  | PathFacetToken
  | FontFacetStyleToken
  | FontFacetUnitToken
  | FontFacetSizeToken
  | StrokeFacetToken

// ---

export {
  FillFacetToken,
  PathFacetToken,
  FontFacetStyleToken,
  FontFacetUnitToken,
  FontFacetSizeToken,
  StrokeFacetToken,
  AnyFacetToken
};
