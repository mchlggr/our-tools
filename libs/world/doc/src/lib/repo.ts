import { Repo } from '@automerge/automerge-repo';
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel';
import { BrowserWebSocketClientAdapter } from '@automerge/automerge-repo-network-websocket';
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb';

// ---
const worldRepo = new Repo({
    network: [
        new BroadcastChannelNetworkAdapter(),
        new BrowserWebSocketClientAdapter('wss://sync.automerge.org')
    ],
    storage: new IndexedDBStorageAdapter(),
})

// ---

export { worldRepo }
