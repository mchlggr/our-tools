import { next as A } from '@automerge/automerge';
import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';
import { HistoryManager } from '@our-tools/crdt-track';

// ---

const repo = new Repo({
  network: [
    new BroadcastChannelNetworkAdapter(),
    new BrowserWebSocketClientAdapter('wss://sync.automerge.org')
  ],
  storage: new IndexedDBStorageAdapter()
});


// TODO: const historyManager = new HistoryManager()

interface DocInit<T> {
  (doc: T): void
}

type CreateOpts = { docUrl: string, historyManager?: boolean }

const create = async <T>(init: DocInit<T>, opts: CreateOpts): Promise<A.Doc<T>> => {
  if (isValidAutomergeUrl(opts.docUrl)) {
    throw new Error(`Doc already exists, docUrl=${opts.docUrl}`);
  }
  const handle = repo.create<T>();
  handle.change(init);
  if(opts.historyManager) {
    //TODO: historyManager.addHandle(handle)
  }
  return await handle.doc();
};

// ---

export { repo, create };

export function crdtRepo(): string {
  return 'crdt-repo';
}
