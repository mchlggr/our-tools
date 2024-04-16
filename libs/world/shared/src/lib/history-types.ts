import { ChangeOptions, Patch } from '@automerge/automerge';
import { WorldModel } from './doc-types';

// ---
// type WorldTimeline = WorldEvent[]

type WorldHistory = {
  // timelineAt: number[] // branching address for present timeline location
  // timeline: WorldTimeline, // Cached spacial history of document
  undo: [],
  redo: [],
}


// ---

// ---


// ---

export {
  // WorldChange,
  // WorldTimeline,
  // HistoryStacks,
  WorldHistory,
  // equalArrays,
  // defaultScope,
  // WorldRepo,
  // UndoRedoOptions,
  // HistoryItem
};
