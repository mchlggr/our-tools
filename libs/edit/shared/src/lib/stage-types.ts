import { PointerState, PointerStore } from './pointer-types';
import { ViewportState, ViewportStore } from './view-types';

// ---

type EditStage = {
  viewport: ViewportState,
  pointers: PointerState[]
}

type EditAwareness = {
  [userId: string]: {
    name: string,
    onlineAt: Date,
    stages: {
      [stageId: string]: EditStage
    }
  }
}

// ---

type StageStore = PointerStore & ViewportStore

// ---

export { StageStore, EditAwareness };
