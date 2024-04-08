import { DocHandle, Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import {
  defaultScope,
  equalArrays,
  HistoryItem,
  HistoryStacks,
  UndoRedoOptions,
  WorldChange
} from '@penumbra/world-shared';
import { Change, ChangeFn, ChangeOptions, Patch, PatchInfo } from '@automerge/automerge';
import { next as A } from '@automerge/automerge';
import { unpatchAll } from './unpatch';
import { patch } from './patch';
import * as path from 'path';
import { head } from 'lodash';

// ---
const historyRepo = new Repo({
  network: [
    new BroadcastChannelNetworkAdapter(),
    new BrowserWebSocketClientAdapter('wss://sync.automerge.org')
  ]
  // storage: new IndexedDBStorageAdapter(),
});

const initialStack = (): HistoryStacks => ({
  [defaultScope]: { undos: [], redos: [] }
});


type HistoryChangeOptions<T> = ChangeOptions<T> & {
  scope?: string
  description?: string
}

type OptionalDescription = string | void

interface UndoRedoer<T> {
  handle: DocHandle<T>;

  transaction(fn: () => OptionalDescription, options: UndoRedoOptions<T>): void;

  startTransaction(): void;

  endTransaction(options: UndoRedoOptions<T>): void;

  edit(editFn: ChangeFn<T>, options: HistoryChangeOptions<T>): void;

  change(editFn: ChangeFn<T>, options: HistoryChangeOptions<T>): void;

  commit(editFn: ChangeFn<T>, options: UndoRedoOptions<T>): void;

  canUndo(scope: string): boolean;

  canRedo(scope: string): boolean;

  undos(scope: string): WorldChange[];

  redos(scope: string): WorldChange[];

  undo(scope: string): void;

  redo(scope: string): void;

}

interface PatchCallbackFn<T> {
  (patches: Patch[], patchInfo: PatchInfo<T>): void;
}

class HistoryRepo<T> implements UndoRedoer<T> {
  #docHandle: DocHandle<T>;
  #stacks: HistoryStacks = initialStack();
  #isTransaction = false;
  #editStack: ChangeFn<T>[] = [];

  constructor(handle: DocHandle<T>) {
    this.#docHandle = handle;
  }

  get handle() {
    return this.#docHandle;
  }

  transaction(fn: () => OptionalDescription, options: UndoRedoOptions<T>) {
    this.startTransaction();
    const description = fn() ?? options?.description;
    return this.endTransaction({ ...options, description });
  }

  // ---

  startTransaction() {
    if (this.#isTransaction) {
      throw new Error('Already in a transaction');
    }

    this.#isTransaction = true;
    this.#editStack = [];
  }

  endTransaction(options: UndoRedoOptions<T> = {}) {
    this.#isTransaction = false;

    return this.commit((doc) => {
      this.#editStack.forEach((commit) => {
        commit(doc);
      });
    }, options);
  }

// ---

  edit(editFn: ChangeFn<T>, options: HistoryChangeOptions<T>) {
    // const changedEntities = model.entities !== draft.entities;
    // const changedFacets = model.entities !== draft.entities;
    // const shouldCommit = changedEntities || changedFacets;
    // if (shouldCommit) {
    //   this.commit(editFn, options);
    // } else {
    //   this.change(editFn, options);
    // }
  }

  change(editFn: ChangeFn<T>, options: HistoryChangeOptions<T> = {}) {
    if (this.#isTransaction) {
      this.#editStack.push(editFn);
    } else {
      this.#docHandle.change(editFn, options);
    }
  }

  commit(editFn: ChangeFn<T>, options: UndoRedoOptions<T>) {
    if (this.#isTransaction) {
      this.#editStack.push(editFn);
      return;
    }

    const { scope = defaultScope, description } = options;
    const stack = this.stack(scope);

    let patched = [];

    const patchCallback: PatchCallbackFn<T> = (patches, patchInfo) => {
      if (options?.patchCallback) {
        options.patchCallback(patches, patchInfo);
      }

      patched = patches;

      const beforeHeads = A.getHeads(patchInfo.before);
      const afterHeads = A.getHeads(patchInfo.after);

      stack.undos.push({
        redo: {
          heads: A.getHeads(patchInfo.before),
          patches
        },
        undo: {
          heads: A.getHeads(patchInfo.after),
          patches: unpatchAll(patchInfo.before, patches)
          // patches: A.diff(patchInfo.before, beforeHeads, afterHeads)
        },
        description
      });
      stack.redos = [];
    };

    this.change(editFn, { ...options, patchCallback });
    return patched.length > 0;
  }

  // ---

  undos(scope: string= defaultScope): WorldChange[] {
    return this.stack(scope).undos;
  }

  redos(scope: string=defaultScope): WorldChange[] {
    return this.stack(scope).redos;
  }

  canUndo(scope: string=defaultScope) {
    return this.undos(scope).length > 0;
  }

  canRedo(scope: string=defaultScope) {
    return this.redos(scope).length > 0;
  }

  undo(scope: string=defaultScope) {
    const stack = this.stack(scope);
    const change = stack.undos.pop();

    if (change) {
      const doc = this.#docHandle.docSync();
      const heads = A.getHeads(doc!);

      if (doc && equalArrays(heads, change.undo.heads)) {
        this.change((doc) => {
          change.undo.patches.forEach((p) => patch<T>(doc, p));
        }, {});

        const after = this.#docHandle.docSync();
        const afterHeads = A.getHeads(after!);

        if (stack.undos.length > 0) {
          const nextUndo = stack.undos[stack.undos.length - 1];

          if (equalArrays(nextUndo.undo.heads, change.redo.heads)) {
            nextUndo.undo.heads = afterHeads;
          }
        }
        change.redo.heads = afterHeads;
      } else {
        const before = this.#docHandle.docSync();
        const heads = this.#docHandle.changeAt(change.undo.heads, (doc: A.Doc<T>) => {
          change.undo.patches.forEach((p) => patch<T>(doc, p));
        });

        if (heads) {
          const doc = this.#docHandle.docSync();
          const patches = A.diff(doc, change.undo.heads, heads);

          change.redo.patches = unpatchAll(before, patches);
          change.redo.heads = heads;
        }
      }

      stack.redos.push(change);
    }
  }

  redo(scope: string=defaultScope) {
    const stack = this.stack(scope);
    const change = stack.redos.pop();

    if (change) {
      const doc = this.#docHandle.docSync();
      const heads = A.getHeads(doc);
      if (doc && equalArrays(heads, change.redo.heads)) {
        this.#docHandle.change((doc: A.Doc<T>) => {
          change.redo.patches.forEach((p) => patch<T>(doc, p));
        });
        const after = this.#docHandle.docSync();
        const afterHeads = A.getHeads(after);

        if (stack.redos.length > 0) {
          const nextRedo = stack.redos[stack.redos.length - 1];

          if (equalArrays(nextRedo.redo.heads, change.undo.heads)) {
            nextRedo.redo.heads = afterHeads;
          }
        }

        change.undo.heads = afterHeads;
      } else {
        const heads = this.#docHandle.changeAt(change.redo.heads, (doc: A.Doc<T>) => {
          change.redo.patches.forEach((p) => patch<T>(doc, p));
        });

        if(heads) {
          change.undo.heads = heads;
        }
      }

      stack.undos.push(change)
    }
  }


  // ---


  private stack(scope: string): HistoryItem {
    return this.#stacks[scope];
  }
}

// ---

export { HistoryRepo };
