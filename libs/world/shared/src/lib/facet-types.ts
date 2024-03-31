type Facet = { type: string}

type FillTypeTag = 'fill:none' | 'fill:solid' | 'fill:gradient' | 'fill:image'
type FillFacet = Facet & { type: FillTypeTag }

type StrokeTypeTag = 'stroke:none' | 'stroke:solid' | 'stroke:gradient'
type StrokeFacet = { type: StrokeTypeTag }

type PositionTypeTag = 'position:2d' | 'position:3d'
type PositionFacet = { type: PositionTypeTag }

type PathTypeTag = 'path:rough'
type PathFacet = { type: PathTypeTag }

type FontTypeTag = 'bold' | 'regular' | 'italic'
type FontUnitTag = 'pt' | 'in' | 'px'
type FontSizeFacet = { type: FontTypeTag, unit: FontUnitTag, value: number }

type AnyFacetTypeTag = FillTypeTag | StrokeTypeTag | PositionTypeTag |
  PathTypeTag | FontTypeTag

type AnyFacetTag = FillFacet | StrokeFacet | PositionFacet | PathFacet | FontSizeFacet

// ---

type FacetTransform = (facet: Facet) => Facet
type FacetTransaction = (facet: Facet) => void

// ---

export {
  Facet,
  FillTypeTag,
  FillFacet,
  StrokeTypeTag,
  StrokeFacet,
  PositionTypeTag,
  PositionFacet,
  PathTypeTag,
  PathFacet,
  FontTypeTag,
  FontUnitTag,
  FontSizeFacet,
  AnyFacetTypeTag,
  AnyFacetTag,
  FacetTransform,
  FacetTransaction
}
