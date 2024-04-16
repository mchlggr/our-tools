import { UserData } from '../model-types';
import { Uuid } from '../types';


type FacetUuid = Uuid

type Facet = {
  type: string
  id: FacetUuid
  // tokenizedIds?: [] // Facet Ids of Tokens that refer to this Facet
  referenceIds?: FacetUuid[] // Facet Ids of Tokens that refer to this Facet
  data?: UserData
}

type TypeTagMapping<Tags = string> = {
  [tag: string]: Tags
}



// type PositionTypeTag = 'position:2d' | 'position:3d'
// type PositionFacet = { type: PositionTypeTag }

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
type UnknownFacetSegment = string

const facetTag = {
  fill: 'facet:fill',
  path: 'facet:path',
  text: 'facet:text',
  stroke: 'facet:stroke'
};


// ---

export {
  Facet,
  FacetTransform,
  FacetTransaction,
  UnknownFacetTag,
  UnknownFacetSegment,
  TypeTagMapping,
  facetTag,
};
