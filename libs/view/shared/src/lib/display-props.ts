import {
  AnyFillFacet,
  AnyStrokeFacet,
  Color,
  FillFacet,
  LayerEntity,
  StrokeFacet,
  UserId,
  Uuid
} from '@our-tools/world-shared';

// interface DisplayDocProps {
//
// }

type ViewProps = Omit<LayerEntity, "">

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


type ViewLayerProps = ViewProps & EngagedProps & {
  userColors: UserColorMapping
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
  ViewLineProps
};
