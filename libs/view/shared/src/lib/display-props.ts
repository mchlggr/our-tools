import { LayerEntity, Uuid } from '@our-tools/world-shared';

// interface DisplayDocProps {
//
// }

interface ViewRectangleProps extends LayerEntity {
  selecting: Uuid[] // Array of user ids
  locking: Uuid[]
  packing: Uuid[]
  hinting: Uuid[]
  editing: Uuid[]
  cropping: Uuid[]
  focusing: Uuid[]
}

// interface DisplaySurfaceProps {
// }
//
// interface DisplaySurfaceProps {
//
// }

export {
  ViewRectangleProps
};
