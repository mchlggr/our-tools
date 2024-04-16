import {
  AnyFillFacet, AnyFontFacet, AnyPathTypeTag,
  AnyStrokeFacet,
  LayerEntity, NoneFillFacet, NoneStrokeFacet, SolidFillFacet, SolidStrokeFacet,
  UserId
} from '@our-tools/world-shared';

// interface DisplayDocProps {
//
// }

type ViewProps = Omit<LayerEntity, ''>

type EngagedProps = {
  selecting: UserId[] // Array of user ids
  locking: UserId[]
  packing: UserId[]
  hinting: UserId[]
  editing: UserId[]
  cropping: UserId[]
  focusing: UserId[]
}

type UserColorMapping = Record<UserId, string>


type ViewLayerProps = ViewProps & {
  // userColors: UserColorMapping
}

type ViewRectangleProps = ViewLayerProps & {
  fill: AnyFillFacet
  stroke: AnyStrokeFacet
}

type ViewEllipseProps = ViewLayerProps & {
  fill: AnyFillFacet
  stroke: AnyStrokeFacet
}

type ViewLineProps = ViewLayerProps & {
  stroke: AnyStrokeFacet
}

type ViewPencileProps = ViewLayerProps & {
  path: AnyPathTypeTag
  stroke: AnyStrokeFacet
}

type ViewTextProps = ViewLayerProps & {
  font: AnyFontFacet
  fill: SolidFillFacet | NoneFillFacet
  stroke: SolidStrokeFacet | NoneStrokeFacet
}


// interface DisplaySurfaceProps {
// }
//
// interface DisplaySurfaceProps {
//
// }

export {
  ViewRectangleProps,
  EngagedProps,
  UserColorMapping,
  ViewLayerProps,
  ViewEllipseProps,
  ViewLineProps,
  ViewPencileProps,
  ViewTextProps
};
