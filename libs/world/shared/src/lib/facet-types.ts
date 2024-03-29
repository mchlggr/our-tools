type Facet = { type: string}

type FillType = 'fill:none' | 'fill:solid' | 'fill:gradient' | 'fill:image'
type FillFacet = Facet & { type: FillType }

type StrokeType = 'stroke:none' | 'stroke:solid' | 'stroke:gradient'
type StrokeFacet = { type: StrokeType }

type PositionType = 'position:2d' | 'position:3d'
type PositionFacet = { type: PositionType }

type PathType = 'path:rough'
type PathFacet = { type: PathType }

type FontType = 'bold' | 'regular' | 'italic'
type FontUnit = 'pt' | 'in' | 'px'
type FontSizeFacet = { type: FontType, unit: FontUnit, value: number }

type AnyFacetType = FillType | StrokeType | PositionType |
  PathType | FontType

type AnyFacet = FillFacet | StrokeFacet | PositionFacet | PathFacet | FontSizeFacet

// ---

type FacetTransform = (facet: Facet) => Facet
type FacetTransaction = (facet: Facet) => void

// ---

export {
  Facet,
  FillType,
  FillFacet,
  StrokeType,
  StrokeFacet,
  PositionType,
  PositionFacet,
  PathType,
  PathFacet,
  FontType,
  FontUnit,
  FontSizeFacet,
  AnyFacetType,
  AnyFacet,
  FacetTransform,
  FacetTransaction
}
