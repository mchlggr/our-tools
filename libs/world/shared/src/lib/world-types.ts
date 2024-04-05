import { Point2D, Uuid, WorldUnit } from './types';
import { WorldModel } from './model-types';
import { UnknownToolTag } from './unknown-types';

// ---

type WorldTimeline = WorldModel[]

type WorldPointer = {
  click: Point2D,
  drag: Point2D,
  tool: UnknownToolTag
  path: Point2D[]
}

type WorldComment = {
  by: "",
  content: ""
}

type WorldReview = {
  comments: {
    [entityId: Uuid]: [

    ]
  }
}

type WorldAwareness = {
  [userId: Uuid]: {
    name: string,
    pointers: {
      [pointerId: Uuid]: WorldPointer
    }
  }
}

type WorldArchive = {
  id: Uuid
  version: string
  unit: WorldUnit,
  // document: WorldDoc
  // overlay: WorldOverlay,
  at: number
  timeline: WorldTimeline,
}

// ---

export {
  WorldModel,
  WorldTimeline,
  WorldArchive
};
