import memoize from 'proxy-memoize';
import {get} from 'lodash'

type EntitiesSet = Set<string>

// 2D Point
type Point2D = { x: number, y: number }
type Point3D = { x: number, y: number, z: number }

// Array of points for motion tracing, mouse tracing, then used to derive a 'delta'
type Path2D = Point2D[]
type Path3D = Point3D[]

type Boundary2D = {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}

type Tool = string

type View = {
    target: object
}

interface CustomFacet {
    [key: string]: any
}

interface AnchorFacet2D {
    anchor: Point2D
}

interface FillFacet{
    fill: string
}

interface StrokeFacet {
    stroke: string
}

interface PathFacet2D {
    path: Path2D
}

interface ScaleFacet2D {
    width: number
    height: number
}

interface ScaleFacet3D {
    width: number
    height: number
    depth: number
}

interface CharacterFacet {
    fontSize: string // Must be string with unit notation
}

interface ParagraphFacet {
    alignment: "left" | "center" | "right"
}

interface ContentFacet {
    content: string
}

type StandardFacet = AnchorFacet2D | FillFacet | StrokeFacet | PathFacet2D

type Facet = StandardFacet | CustomFacet

type EllipseLayer = AnchorFacet2D & StrokeFacet & FillFacet
type LineLayer = AnchorFacet2D & StrokeFacet
type PathLayer = AnchorFacet2D & StrokeFacet & FillFacet & PathFacet2D
type RectangleLayer = AnchorFacet2D & StrokeFacet & FillFacet & PathFacet2D
type PolygonLayer = AnchorFacet2D & StrokeFacet & FillFacet & PathFacet2D
type TextLayer = AnchorFacet2D & StrokeFacet & FillFacet & CharacterFacet & ParagraphFacet & ContentFacet
type GroupLayer = AnchorFacet2D

type FacetCollection = {
    [uuid: string]: Facet
}

export type Model = {
    tool: Tool,
    entities: object[]
    facets: FacetCollection,
    selection: EntitiesSet,
    locked: EntitiesSet,
    parked: EntitiesSet,
    // Metadata
    boundary: Boundary2D,
    // partition: aka 'quadtree'
    view: View,
    committedAt: number
}

export type ModelTransform = (model: Model) => Model
export type ModelTransaction = (model: Model) => void

export type FacetTransform = (facet: Facet) => Facet
export type FacetTransaction = (facet: Facet) => void

type ModelStore = {
    viewModel: Model,
    renderModel: ModelTransform,
}

export const getViewModel = ({viewModel}: ModelStore): Model => viewModel
export const getRenderModel: any = ({renderModel}: ModelStore) => renderModel

const getEntities = (model: Model): object[] => get(model, "entities")
const getSelection = (model: Model): EntitiesSet => get(model, "selection")

export const getViewEntities = ({viewModel}: ModelStore): object[] => getEntities(viewModel)
export const getViewSelection = ({viewModel}: ModelStore): EntitiesSet => getSelection(viewModel)