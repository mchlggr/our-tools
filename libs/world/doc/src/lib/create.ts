import {
  defaultUnit,
  defaultVersion,
  emptyBoundary,
  emptyEntities,
  emptyFacets,
  uuid,
  WorldArchive,
  WorldModel
} from '@penumbra/world-shared';
import { isValidAutomergeUrl } from '@automerge/automerge-repo';
import { worldRepo } from './history-repo';
import { next as A } from '@automerge/automerge';

//TODO: move to another shared module
const defaultTool = 'tool:select';

const createWorld = async (docUrl: string): Promise<WorldArchive> => {
  if (isValidAutomergeUrl(docUrl)) {
    throw new Error(`WorldDoc already exists, docUrl=${docUrl}`);
  }
  const handle =
  handle.change((doc: WorldModel) => {
    // doc = { ...doc }
    doc.modifiedBy = 'user:13221';
    doc.modifiedAt = new Date();
    doc.modifiedCounter = new A.Counter();
    //
    doc.tool = defaultTool;
    doc.selectingIds = {};
    //
    doc.lockingIds = {};
    doc.parkingIds = {};
    doc.erasingIds = {};
    doc.hintingIds = {};
    //
    doc.editingIds = {}
    doc.croppingIds = {}
    doc.focusingIds = {}
    //
    doc.boundary = emptyBoundary;
    //
    doc.facets = emptyFacets;
    //
    doc.entities = emptyEntities;
    //
    doc.edges = [];
  });
  const doc = await handle.doc();
  return {
    id: uuid('world'),
    version: defaultVersion,
    unit: defaultUnit,
    doc,
    docUrl,
    history: {
      at: [],
      timeline: []
    }
  };
};

// ---

export { createWorld }
