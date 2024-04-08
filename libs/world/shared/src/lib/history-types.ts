import { ChangeOptions, Patch } from '@automerge/automerge';
import { WorldModel } from '@penumbra/world-shared';

// ---
// type WorldTimeline = WorldEvent[]

type WorldHistory = {
  // timelineAt: number[] // branching address for present timeline location
  // timeline: WorldTimeline, // Cached spacial history of document
  undo: [],
  redo: [],
}


// ---

type WorldChange = {
  undo: { heads: string[]; patches: Patch[] }
  redo: { heads: string[]; patches: Patch[] }
  description?: string
}

type HistoryItem = { undos: WorldChange[], redos: WorldChange[] }
type HistoryStacks = Record<string, HistoryItem >

type UndoRedoOptions<T> = ChangeOptions<T> & {
  description?: string,
  scope?: string,
}

// TODO: move to extensions
const equalArrays = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);
const defaultScope = 'scope:root'

// ---


// ---

export {
  WorldChange,
  // WorldTimeline,
  HistoryStacks,
  WorldHistory,
  equalArrays,
  defaultScope,
  // WorldRepo,
  UndoRedoOptions,
  HistoryItem
};
