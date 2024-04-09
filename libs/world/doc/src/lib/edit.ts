import { WorldModel } from '@our-tools/world-shared';
import { chain } from 'lodash';
import { repo } from '@our-tools/crdt-repo';
import { HistoryManager } from '@our-tools/crdt-track';
import { DocumentId } from '@automerge/automerge-repo';


// const changedEntities = model.entities !== draft.entities
// const changedFacets = model.entities !== draft.entities
// const shouldTrack = changedEntities || changedFacets

const changeWorld = <T>(updater: (doc: T) => void, opts: {
  track: false
  documentId: DocumentId,
  historyManager: HistoryManager
}) => {
  const history = opts.historyManager.getUndoRedoHandle<T>(opts.documentId);
  if (!history) {
    throw new Error('Missing tracked handle for documentId');
  }

  if (opts.track) {
    opts.historyManager.transaction(() => {
      // trackedHandle?.trackChange(updateMetadata);
      history?.trackChange(updater);
    });
  } else {
    // trackedHandle?.handle.change(updateMetadata);
    history.handle.change(updater);
  }
};

//
// // ---
//
// export { changeWorld }
// // const mapEntitites = (entities, fn) => chain(entities)
// //   .map(fn)
// //   .flatten()
// //   .compact()
// //   .value()
// //
// // const entityDim = (attributes, certainAttr, pathAttr, boundaryAttr1, boundaryAttr2) => {
// //     let dims = compact(attributes)
// //     if (certainAttr) {
// //         dims = [...dims, ...dims.map(d => d + certainAttr)]
// //     }
// //     if (pathAttr) {
// //         dims.push(...pathAttr.map(attr => attr))
// //     }
// //     if (boundaryAttr1 && boundaryAttr2) {
// //         dims.push(...[boundaryAttr1, boundaryAttr2])
// //     }
// //     return dims
// // }
//
// // const boundary = ({ entities }: WorldModel) => {
// // const longitudes = mapEntitites(entities, en)
// //
// // }
// const { transaction, undo, redo } = manager;
