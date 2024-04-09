import { DocHandle, Repo } from '@automerge/automerge-repo';
import {
  // defaultScope,
  // equalArrays,
  // HistoryItem,
  // HistoryStacks,
  // UndoRedoOptions,
  // WorldChange
} from '@our-tools/world-shared';
import { Change, ChangeFn, ChangeOptions, Patch, PatchInfo } from '@automerge/automerge';
import { next as A} from '@automerge/automerge';
import { unpatchAll } from '@our-tools/crdt-patch';
import { patch } from '@our-tools/crdt-patch';
import * as path from 'path';
import { head } from 'lodash';


type WorldChange = {
  undo: { heads: string[]; patches: Patch[] }
  redo: { heads: string[]; patches: Patch[] }
  description?: string
}

type HistoryItem = { undos: WorldChange[], redos: WorldChange[] }
type HistoryStacks = Record<string, HistoryItem >

// ---
// const historyRepo = new Repo({
//   network: [
//     new BroadcastChannelNetworkAdapter(),
//     new BrowserWebSocketClientAdapter('wss://sync.automerge.org')
//   ]
//   // storage: new IndexedDBStorageAdapter(),
// });


type UndoRedoOptions<T> = ChangeOptions<T> & {
  description?: string,
  scope?: string,
}

// TODO: move to extensions
const equalArrays = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i]);
const defaultScope = 'scope:root'

const initialStack = (): HistoryStacks => ({
  [defaultScope]: { undos: [], redos: [] }
});

const emptyStack = () => ({ undos: [], redos: [] });

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


class History<T> {
  #docHandle: DocHandle<T>;

  get handle() {
    return this.#docHandle;
  }

  // #stacks: Record<string | symbol, { undos: Change[]; redos: Change[] }> = {
  //   [defaultScope]: { undos: [], redos: [] },
  // };
  #stacks: HistoryStacks = initialStack();


  constructor(docHandle: DocHandle<T>) {
    this.#docHandle = docHandle;
  }

  #isTransaction = false;

  #changeStack: ChangeFn<T>[] = [];

  transaction(fn: () => OptionalDescription, options: UndoRedoOptions<T>) {
    this.startTransaction();
    const description = fn() ?? options?.description;
    return this.endTransaction({ ...options, description });
  }

  startTransaction() {
    if (this.#isTransaction) {
      throw new Error('Already in a transaction');
    }

    this.#isTransaction = true;
    this.#changeStack = [];
  }

  endTransaction(options: UndoRedoOptions<T>) {
    this.#isTransaction = false;

    return this.trackChange((doc) => {
      this.#changeStack.forEach((change) => {
        change(doc);
      });
    }, options);
  }

  trackChange(changeFn: ChangeFn<T>, options: UndoRedoOptions<T> = {}) {
    if (this.#isTransaction) {
      this.#changeStack.push(changeFn);
      return;
    }

    const { scope = defaultScope, description } = options;
    const stack = this.getStack(scope);

    let ps = [];

    const patchCallback = (patches: Patch[], patchInfo: PatchInfo<T>) => {
      if (options && typeof options !== "string" && options.patchCallback) {
        options.patchCallback(patches, patchInfo);
      }

      ps = patches;

      stack.undos.push({
        redo: {
          heads: A.getHeads(patchInfo.before),
          patches,
        },
        undo: {
          heads: A.getHeads(patchInfo.after),
          patches: unpatchAll(patchInfo.before, patches),
        },
        description:
          typeof options === "string" ? options : options.description,
      });

      stack.redos = [];
    };

    this.#docHandle.change(changeFn, {
      ...(typeof options === "string" ? {} : options),
      patchCallback,
    });

    return ps.length > 0;
  }

  canUndo(scope: string = defaultScope) {
    const stack = this.getStack(scope);
    return stack.undos.length > 0;
  }

  canRedo(scope: string = defaultScope) {
    const stack = this.getStack(scope);
    return stack.redos.length > 0;
  }

  undos(scope: string  = defaultScope) {
    const stack = this.getStack(scope);
    return stack.undos;
  }

  redos(scope: string= defaultScope) {
    const stack = this.getStack(scope);
    return stack.redos;
  }

  undo(scope: string = defaultScope) {
    const stack = this.getStack(scope);
    const change = stack.undos.pop();
    if (change) {
      const doc = this.#docHandle.docSync();
      const heads = A.getHeads(doc!);
      if (doc && equalArrays(heads, change.undo.heads)) {
        this.#docHandle.change((doc: A.Doc<T>) => {
          change.undo.patches.forEach((p) => {
            patch<T>(doc, p);
          });
        });

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
        const before = this.#docHandle.docSync()!;
        const heads = this.#docHandle.changeAt(change.undo.heads, (doc: A.Doc<T>) => {
          change.undo.patches.forEach((p) => {
            patch<T>(doc, p);
          });
        });

        if (heads) {
          const patches = A.diff(
            this.#docHandle.docSync()!,
            change.undo.heads,
            heads,
          );

          change.redo.patches = unpatchAll(before, patches);
          change.redo.heads = heads;
        }
      }

      stack.redos.push(change);
    }
  }

  redo(scope: string = defaultScope) {
    const stack = this.getStack(scope);
    const change = stack.redos.pop();
    if (change) {
      const doc = this.#docHandle.docSync();
      const heads = A.getHeads(doc!);
      if (doc && equalArrays(heads, change.redo.heads)) {
        this.#docHandle.change((doc: A.Doc<T>) => {
          change.redo.patches.forEach((p) => {
            patch<T>(doc, p);
          });
        });

        const after = this.#docHandle.docSync();
        const afterHeads = A.getHeads(after!);

        if (stack.redos.length > 0) {
          const nextRedo = stack.redos[stack.redos.length - 1];

          if (equalArrays(nextRedo.redo.heads, change.undo.heads)) {
            nextRedo.redo.heads = afterHeads;
          }
        }

        change.undo.heads = afterHeads;
      } else {
        const heads = this.#docHandle.changeAt(change.redo.heads, (doc: A.Doc<T>) => {
          change.redo.patches.forEach((p) => {
            patch<T>(doc, p);
          });
        });

        if (heads) {
          change.undo.heads = heads;
        }
      }

      stack.undos.push(change);
    }
  }

  private getStack(scope: string) {
    if (!this.#stacks[scope]) {
      this.#stacks[scope] = emptyStack();
    }

    return this.#stacks[scope];
  }
}
// ---

export { History, defaultScope, UndoRedoOptions };
