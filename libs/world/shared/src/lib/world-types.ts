import { Point2D, Uuid, WorldUnit } from './types';
import { WorldModel } from './model-types';
import { UnknownToolTag } from './unknown-types';

// ---

type WorldTimeline = WorldModel[]

type WorldAwareness = {
 [userId: Uuid]: {
   name: string,
   pointers: {
     [pointerId: Uuid]: {
       click: Point2D,
       drag: Point2D,
       tool: UnknownToolTag
     }
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
  WorldArchive,
};
